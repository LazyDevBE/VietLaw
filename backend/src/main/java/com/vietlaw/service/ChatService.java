package com.vietlaw.service;

import com.vietlaw.dto.request.ChatRequest;
import com.vietlaw.dto.request.CreateSessionRequest;
import com.vietlaw.dto.response.ChatMessageResponse;
import com.vietlaw.dto.response.ChatResponse;
import com.vietlaw.dto.response.ChatSessionResponse;
import com.vietlaw.entity.ChatMessage;
import com.vietlaw.entity.ChatSession;
import com.vietlaw.entity.User;
import com.vietlaw.security.UserPrincipal;
import com.vietlaw.repository.ChatMessageRepository;
import com.vietlaw.repository.ChatSessionRepository;
import com.vietlaw.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final GeminiService geminiService;
    private final SubscriptionService subscriptionService;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("🔧 Authentication: " + authentication);
        System.out.println("🔧 Authentication name: " + authentication.getName());
        System.out.println("🔧 Authentication principal: " + authentication.getPrincipal());
        
        if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("User not authenticated");
        }
        
        // Get email from UserPrincipal instead of authentication.getName()
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String email = userPrincipal.getEmail();
        
        System.out.println("🔧 Email from UserPrincipal: " + email);
        
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Transactional
    public ChatResponse sendMessage(ChatRequest request) {
        User currentUser = getCurrentUser();
        
        // Kiểm tra giới hạn tin nhắn
        if (!subscriptionService.canSendMessage(currentUser)) {
            throw new RuntimeException("Bạn đã đạt giới hạn tin nhắn trong tháng này. Vui lòng nâng cấp gói để tiếp tục sử dụng.");
        }
        
        ChatSession session;
        boolean isNewSession = false;

        // Tìm hoặc tạo session
        if (request.getSessionId() != null) {
            session = chatSessionRepository.findByIdAndUserAndIsActiveTrue(request.getSessionId(), currentUser)
                    .orElseThrow(() -> new RuntimeException("Session not found"));
        } else {
            // Tạo session mới với title từ Gemini
            String title = geminiService.generateSessionTitle(request.getContent());
            session = new ChatSession(currentUser, title);
            session = chatSessionRepository.save(session);
            isNewSession = true;
        }

        // Lưu tin nhắn của user
        ChatMessage userMessage = new ChatMessage(session, request.getContent(), ChatMessage.MessageType.USER);
        userMessage = chatMessageRepository.save(userMessage);

        // Lấy lịch sử conversation để gửi cho Gemini
        List<ChatMessage> conversationHistory = chatMessageRepository.findByChatSessionOrderByCreatedAtAsc(session);
        List<Map<String, String>> messages = conversationHistory.stream()
                .map(msg -> {
                    Map<String, String> message = new HashMap<>();
                    message.put("role", msg.getMessageType() == ChatMessage.MessageType.USER ? "user" : "assistant");
                    message.put("content", msg.getContent());
                    return message;
                })
                .collect(Collectors.toList());

        // Tạo phản hồi AI từ Gemini
        log.info("Calling GeminiService for message: {}", request.getContent());
        long startTime = System.currentTimeMillis();
        String aiResponseContent = geminiService.generateResponse(request.getContent(), messages);
        long responseTime = System.currentTimeMillis() - startTime;
        log.info("GeminiService response received in {}ms: {}", responseTime, aiResponseContent.substring(0, Math.min(100, aiResponseContent.length())));

        ChatMessage aiMessage = new ChatMessage(session, aiResponseContent, ChatMessage.MessageType.AI);
        aiMessage.setResponseTimeMs(responseTime);
        aiMessage.setTokensUsed(geminiService.estimateTokens(request.getContent() + aiResponseContent));
        aiMessage = chatMessageRepository.save(aiMessage);

        // Tăng số lượng tin nhắn đã sử dụng
        subscriptionService.incrementMessageCount(currentUser);

        // Cập nhật thời gian session
        session.setUpdatedAt(LocalDateTime.now());
        chatSessionRepository.save(session);

        ChatResponse response = new ChatResponse(
                session.getId(),
                ChatMessageResponse.fromEntity(userMessage),
                ChatMessageResponse.fromEntity(aiMessage)
        );
        response.setSessionTitle(session.getTitle());
        response.setIsNewSession(isNewSession);

        return response;
    }

    public List<ChatSessionResponse> getUserSessions() {
        User currentUser = getCurrentUser();
        List<ChatSession> sessions = chatSessionRepository.findByUserAndIsActiveTrueOrderByUpdatedAtDesc(currentUser);
        return sessions.stream()
                .map(ChatSessionResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Page<ChatSessionResponse> getUserSessions(Pageable pageable) {
        User currentUser = getCurrentUser();
        Page<ChatSession> sessions = chatSessionRepository.findByUserAndIsActiveTrueOrderByUpdatedAtDesc(currentUser, pageable);
        return sessions.map(ChatSessionResponse::fromEntity);
    }

    public ChatSessionResponse getSessionWithMessages(Long sessionId) {
        User currentUser = getCurrentUser();
        ChatSession session = chatSessionRepository.findByIdAndUserAndIsActiveTrue(sessionId, currentUser)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        return ChatSessionResponse.fromEntity(session, true);
    }

    @Transactional
    public ChatSessionResponse createSession(CreateSessionRequest request) {
        User currentUser = getCurrentUser();
        ChatSession session = new ChatSession(currentUser, request.getTitle());
        session = chatSessionRepository.save(session);
        return ChatSessionResponse.fromEntity(session);
    }

    @Transactional
    public void deleteSession(Long sessionId) {
        User currentUser = getCurrentUser();
        ChatSession session = chatSessionRepository.findByIdAndUserAndIsActiveTrue(sessionId, currentUser)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setIsActive(false);
        chatSessionRepository.save(session);
    }

    @Transactional
    public ChatSessionResponse updateSessionTitle(Long sessionId, String newTitle) {
        User currentUser = getCurrentUser();
        ChatSession session = chatSessionRepository.findByIdAndUserAndIsActiveTrue(sessionId, currentUser)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setTitle(newTitle);
        session = chatSessionRepository.save(session);
        return ChatSessionResponse.fromEntity(session);
    }

    public List<ChatSessionResponse> searchSessions(String keyword) {
        User currentUser = getCurrentUser();
        List<ChatSession> sessions = chatSessionRepository.findByUserAndTitleContaining(currentUser, keyword);
        return sessions.stream()
                .map(ChatSessionResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // Helper methods - Đã chuyển sang GeminiService
}
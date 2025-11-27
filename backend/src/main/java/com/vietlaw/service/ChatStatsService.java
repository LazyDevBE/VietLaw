package com.vietlaw.service;

import com.vietlaw.repository.ChatMessageRepository;
import com.vietlaw.repository.ChatSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatStatsService {

    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;

    public Map<String, Object> getChatStatistics() {
        Map<String, Object> stats = new HashMap<>();
        
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);

        // Thống kê session
        List<Object[]> sessionStats = chatSessionRepository.getSessionStatsByDate(thirtyDaysAgo);
        stats.put("sessionStatsByDate", sessionStats);

        // Thống kê tin nhắn
        List<Object[]> messageStats = chatMessageRepository.getMessageStatsByDate(thirtyDaysAgo);
        stats.put("messageStatsByDate", messageStats);

        // Thống kê tổng quan
        stats.put("totalSessions", chatSessionRepository.count());
        stats.put("totalMessages", chatMessageRepository.count());
        
        // Thống kê tokens
        Long totalTokens = chatMessageRepository.getTotalTokensUsedByUser(null, thirtyDaysAgo);
        stats.put("totalTokensUsed", totalTokens != null ? totalTokens : 0);

        // Thời gian phản hồi trung bình
        Double avgResponseTime = chatMessageRepository.getAverageResponseTime(sevenDaysAgo);
        stats.put("averageResponseTime", avgResponseTime != null ? avgResponseTime : 0);

        return stats;
    }

    public Map<String, Object> getUserChatStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();
        
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        
        // Tokens sử dụng
        Long tokensUsed = chatMessageRepository.getTotalTokensUsedByUser(userId, thirtyDaysAgo);
        stats.put("tokensUsed", tokensUsed != null ? tokensUsed : 0);
        
        return stats;
    }
}
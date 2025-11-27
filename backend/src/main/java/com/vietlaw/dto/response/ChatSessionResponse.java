package com.vietlaw.dto.response;

import com.vietlaw.entity.ChatSession;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatSessionResponse {
    private Long id;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;
    private Integer messageCount;
    private String lastMessage;
    private List<ChatMessageResponse> messages;

    public static ChatSessionResponse fromEntity(ChatSession session) {
        return fromEntity(session, false);
    }

    public static ChatSessionResponse fromEntity(ChatSession session, boolean includeMessages) {
        ChatSessionResponse response = new ChatSessionResponse();
        response.setId(session.getId());
        response.setTitle(session.getTitle());
        response.setCreatedAt(session.getCreatedAt());
        response.setUpdatedAt(session.getUpdatedAt());
        response.setIsActive(session.getIsActive());
        response.setMessageCount(session.getMessages().size());
        
        // Lấy tin nhắn cuối cùng
        if (!session.getMessages().isEmpty()) {
            response.setLastMessage(session.getMessages().get(session.getMessages().size() - 1).getContent());
        }
        
        // Bao gồm tất cả tin nhắn nếu được yêu cầu
        if (includeMessages) {
            response.setMessages(
                session.getMessages().stream()
                    .map(ChatMessageResponse::fromEntity)
                    .collect(Collectors.toList())
            );
        }
        
        return response;
    }
}
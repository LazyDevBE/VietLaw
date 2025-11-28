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

    // Explicit getters and setters for Docker build compatibility
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Integer getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(Integer messageCount) {
        this.messageCount = messageCount;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
    }

    public List<ChatMessageResponse> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessageResponse> messages) {
        this.messages = messages;
    }
}
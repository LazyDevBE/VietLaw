package com.vietlaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
    private Long sessionId;
    private ChatMessageResponse userMessage;
    private ChatMessageResponse aiResponse;
    private String sessionTitle;
    private Boolean isNewSession;

    public ChatResponse(Long sessionId, ChatMessageResponse userMessage, ChatMessageResponse aiResponse) {
        this.sessionId = sessionId;
        this.userMessage = userMessage;
        this.aiResponse = aiResponse;
        this.isNewSession = false;
    }

    // Explicit getters and setters for Docker build compatibility
    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public ChatMessageResponse getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(ChatMessageResponse userMessage) {
        this.userMessage = userMessage;
    }

    public ChatMessageResponse getAiResponse() {
        return aiResponse;
    }

    public void setAiResponse(ChatMessageResponse aiResponse) {
        this.aiResponse = aiResponse;
    }

    public String getSessionTitle() {
        return sessionTitle;
    }

    public void setSessionTitle(String sessionTitle) {
        this.sessionTitle = sessionTitle;
    }

    public Boolean getIsNewSession() {
        return isNewSession;
    }

    public void setIsNewSession(Boolean isNewSession) {
        this.isNewSession = isNewSession;
    }
}
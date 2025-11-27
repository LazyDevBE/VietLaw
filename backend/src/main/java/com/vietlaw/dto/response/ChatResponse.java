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
}
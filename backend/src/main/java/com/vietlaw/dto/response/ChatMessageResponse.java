package com.vietlaw.dto.response;

import com.vietlaw.entity.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageResponse {
    private Long id;
    private String content;
    private ChatMessage.MessageType messageType;
    private LocalDateTime createdAt;
    private Integer tokensUsed;
    private Long responseTimeMs;

    public static ChatMessageResponse fromEntity(ChatMessage message) {
        return new ChatMessageResponse(
                message.getId(),
                message.getContent(),
                message.getMessageType(),
                message.getCreatedAt(),
                message.getTokensUsed(),
                message.getResponseTimeMs()
        );
    }
}
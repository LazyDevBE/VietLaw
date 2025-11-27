package com.vietlaw.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChatRequest {
    @NotBlank(message = "Nội dung tin nhắn không được để trống")
    @Size(max = 5000, message = "Tin nhắn không được vượt quá 5000 ký tự")
    private String content;

    private Long sessionId; // Null nếu tạo session mới
}
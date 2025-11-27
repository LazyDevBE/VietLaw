package com.vietlaw.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateSessionRequest {
    @NotBlank(message = "Tiêu đề session không được để trống")
    @Size(min = 1, max = 200, message = "Tiêu đề phải từ 1-200 ký tự")
    private String title;
}
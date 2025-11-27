package com.vietlaw.dto.request;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String fullName;
    private String username;
    private String email;
    private String phone;
}
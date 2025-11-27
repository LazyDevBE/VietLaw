package com.vietlaw.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private Set<String> roles;
    private String subscriptionPlan;
    private Integer monthlyMessageCount;
    private Integer messageLimit;

    public AuthResponse(String token, Long id, String username, String email, String fullName, Set<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
    }

    public AuthResponse(String token, Long id, String username, String email, String fullName, Set<String> roles, 
                       String subscriptionPlan, Integer monthlyMessageCount, Integer messageLimit) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
        this.subscriptionPlan = subscriptionPlan;
        this.monthlyMessageCount = monthlyMessageCount;
        this.messageLimit = messageLimit;
    }
}
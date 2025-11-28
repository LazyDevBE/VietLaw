package com.vietlaw.controller;

import com.vietlaw.dto.response.ApiResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = {"http://localhost:5173", "https://viet-law.vercel.app"})
public class TestController {

    @GetMapping("/health")
    public ApiResponse<Map<String, Object>> healthCheck() {
        Map<String, Object> data = new HashMap<>();
        data.put("status", "OK");
        data.put("timestamp", LocalDateTime.now());
        data.put("message", "VietLaw Backend is running successfully!");
        
        return ApiResponse.success("Health check passed", data);
    }

    @GetMapping("/public")
    public ApiResponse<String> publicEndpoint() {
        return ApiResponse.success("This is a public endpoint - no authentication required");
    }
}

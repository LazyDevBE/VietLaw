package com.vietlaw.controller;

import com.vietlaw.dto.response.ApiResponse;
import com.vietlaw.entity.SubscriptionPlan;
import com.vietlaw.entity.User;
import com.vietlaw.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/subscription")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "https://viet-law.vercel.app"})
@Slf4j
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @GetMapping("/info")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSubscriptionInfo() {
        try {
            User currentUser = subscriptionService.getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401)
                        .body(ApiResponse.error("Người dùng chưa đăng nhập"));
            }

            Map<String, Object> info = new HashMap<>();
            
            // Ensure subscription fields are initialized
            SubscriptionPlan plan = currentUser.getSubscriptionPlan();
            if (plan == null) {
                plan = SubscriptionPlan.FREE;
            }
            
            Integer messageCount = currentUser.getMonthlyMessageCount();
            if (messageCount == null) {
                messageCount = 0;
            }
            
            info.put("plan", plan.name());
            info.put("messageLimit", plan.getMessageLimit());
            info.put("usedMessages", messageCount);
            info.put("remainingMessages", subscriptionService.getRemainingMessages(currentUser));
            info.put("isUnlimited", plan.isUnlimited());

            return ResponseEntity.ok(ApiResponse.success("Lấy thông tin subscription thành công", info));
        } catch (Exception e) {
            log.error("Error getting subscription info: ", e);
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Lỗi hệ thống khi lấy thông tin subscription"));
        }
    }

    @PostMapping("/upgrade/{plan}")
    public ResponseEntity<ApiResponse<String>> upgradeSubscription(@PathVariable String plan) {
        try {
            User currentUser = subscriptionService.getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Người dùng chưa đăng nhập"));
            }

            // TODO: Implement payment processing here
            // For now, just upgrade directly
            
            return ResponseEntity.ok(ApiResponse.success("Nâng cấp thành công", "Gói đã được nâng cấp"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi nâng cấp: " + e.getMessage()));
        }
    }
}

package com.vietlaw.controller;

import com.vietlaw.dto.response.ApiResponse;
import com.vietlaw.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174","https://viet-law.vercel.app"})
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        try {
            Map<String, Object> stats = adminService.getDashboardStats();
            return ResponseEntity.ok(ApiResponse.success("Lấy thống kê dashboard thành công", stats));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy thống kê: " + e.getMessage()));
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Map<String, Object> result = adminService.getUsers(pageable, search);
            return ResponseEntity.ok(ApiResponse.success("Lấy danh sách người dùng thành công", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy danh sách người dùng: " + e.getMessage()));
        }
    }

    @GetMapping("/users/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserDetail(@PathVariable Long userId) {
        try {
            Map<String, Object> userDetail = adminService.getUserDetail(userId);
            return ResponseEntity.ok(ApiResponse.success("Lấy thông tin người dùng thành công", userDetail));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy thông tin người dùng: " + e.getMessage()));
        }
    }

    @PutMapping("/users/{userId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> updateUserStatus(
            @PathVariable Long userId,
            @RequestBody Map<String, Boolean> request) {
        try {
            Boolean isActive = request.get("isActive");
            adminService.updateUserStatus(userId, isActive);
            String message = isActive ? "Kích hoạt người dùng thành công" : "Vô hiệu hóa người dùng thành công";
            return ResponseEntity.ok(ApiResponse.success(message, "Cập nhật thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi cập nhật trạng thái: " + e.getMessage()));
        }
    }

    @GetMapping("/chat-history")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getChatHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String search) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Map<String, Object> result = adminService.getChatHistory(pageable, userId, search);
            return ResponseEntity.ok(ApiResponse.success("Lấy lịch sử chat thành công", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy lịch sử chat: " + e.getMessage()));
        }
    }

    @GetMapping("/analytics")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAnalytics(
            @RequestParam(defaultValue = "30") int days) {
        try {
            Map<String, Object> analytics = adminService.getAnalytics(days);
            return ResponseEntity.ok(ApiResponse.success("Lấy phân tích thành công", analytics));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy phân tích: " + e.getMessage()));
        }
    }

    @DeleteMapping("/chat-sessions/{sessionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteChatSession(@PathVariable Long sessionId) {
        try {
            adminService.deleteChatSession(sessionId);
            return ResponseEntity.ok(ApiResponse.success("Xóa phiên chat thành công", "Đã xóa"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi xóa phiên chat: " + e.getMessage()));
        }
    }

    @PostMapping("/users/update-subscription-plans")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updateAllUsersSubscriptionPlans() {
        try {
            Map<String, Object> result = adminService.updateAllUsersToFreePlan();
            return ResponseEntity.ok(ApiResponse.success("Cập nhật subscription plan thành công", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi cập nhật subscription plan: " + e.getMessage()));
        }
    }
}

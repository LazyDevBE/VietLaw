package com.vietlaw.controller;

import com.vietlaw.dto.request.ChatRequest;
import com.vietlaw.dto.request.CreateSessionRequest;
import com.vietlaw.dto.response.ApiResponse;
import com.vietlaw.dto.response.ChatResponse;
import com.vietlaw.dto.response.ChatSessionResponse;
import com.vietlaw.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<ChatResponse>> sendMessage(@Valid @RequestBody ChatRequest request) {
        try {
            ChatResponse response = chatService.sendMessage(request);
            return ResponseEntity.ok(ApiResponse.success("Tin nhắn đã được gửi", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi gửi tin nhắn: " + e.getMessage()));
        }
    }

    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<ChatSessionResponse>>> getUserSessions() {
        try {
            List<ChatSessionResponse> sessions = chatService.getUserSessions();
            return ResponseEntity.ok(ApiResponse.success("Lấy danh sách session thành công", sessions));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy danh sách session: " + e.getMessage()));
        }
    }

    @GetMapping("/sessions/paginated")
    public ResponseEntity<ApiResponse<Page<ChatSessionResponse>>> getUserSessionsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<ChatSessionResponse> sessions = chatService.getUserSessions(pageable);
            return ResponseEntity.ok(ApiResponse.success("Lấy danh sách session thành công", sessions));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy danh sách session: " + e.getMessage()));
        }
    }

    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<ApiResponse<ChatSessionResponse>> getSession(@PathVariable Long sessionId) {
        try {
            ChatSessionResponse session = chatService.getSessionWithMessages(sessionId);
            return ResponseEntity.ok(ApiResponse.success("Lấy session thành công", session));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi lấy session: " + e.getMessage()));
        }
    }

    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<ChatSessionResponse>> createSession(@Valid @RequestBody CreateSessionRequest request) {
        try {
            ChatSessionResponse session = chatService.createSession(request);
            return ResponseEntity.ok(ApiResponse.success("Tạo session thành công", session));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi tạo session: " + e.getMessage()));
        }
    }

    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<ApiResponse<String>> deleteSession(@PathVariable Long sessionId) {
        try {
            chatService.deleteSession(sessionId);
            return ResponseEntity.ok(ApiResponse.success("Xóa session thành công", "Session đã được xóa"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi xóa session: " + e.getMessage()));
        }
    }

    @PutMapping("/sessions/{sessionId}/title")
    public ResponseEntity<ApiResponse<ChatSessionResponse>> updateSessionTitle(
            @PathVariable Long sessionId,
            @RequestBody Map<String, String> request) {
        try {
            String newTitle = request.get("title");
            if (newTitle == null || newTitle.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Tiêu đề không được để trống"));
            }
            ChatSessionResponse session = chatService.updateSessionTitle(sessionId, newTitle.trim());
            return ResponseEntity.ok(ApiResponse.success("Cập nhật tiêu đề thành công", session));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi cập nhật tiêu đề: " + e.getMessage()));
        }
    }

    @GetMapping("/sessions/search")
    public ResponseEntity<ApiResponse<List<ChatSessionResponse>>> searchSessions(@RequestParam String keyword) {
        try {
            List<ChatSessionResponse> sessions = chatService.searchSessions(keyword);
            return ResponseEntity.ok(ApiResponse.success("Tìm kiếm thành công", sessions));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Lỗi khi tìm kiếm: " + e.getMessage()));
        }
    }
}
package com.vietlaw.service;

import com.vietlaw.entity.ChatSession;
import com.vietlaw.entity.User;
import com.vietlaw.repository.ChatMessageRepository;
import com.vietlaw.repository.ChatSessionRepository;
import com.vietlaw.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime thirtyDaysAgo = now.minusDays(30);
        LocalDateTime sevenDaysAgo = now.minusDays(7);
        LocalDateTime today = now.withHour(0).withMinute(0).withSecond(0);

        // Thống kê tổng quan
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByIsActiveTrue();
        long totalSessions = chatSessionRepository.count();
        long totalMessages = chatMessageRepository.count();

        stats.put("totalUsers", totalUsers);
        stats.put("activeUsers", activeUsers);
        stats.put("totalSessions", totalSessions);
        stats.put("totalMessages", totalMessages);

        // Thống kê người dùng mới trong 30 ngày
        List<User> newUsers = userRepository.findByCreatedAtAfter(thirtyDaysAgo);
        stats.put("newUsersLast30Days", newUsers.size());

        // Thống kê session mới trong 7 ngày
        List<ChatSession> recentSessions = chatSessionRepository.findByCreatedAtAfter(sevenDaysAgo);
        stats.put("newSessionsLast7Days", recentSessions.size());

        // Thống kê đăng ký theo ngày (30 ngày gần nhất)
        Map<String, Long> registrationsByDate = newUsers.stream()
                .collect(Collectors.groupingBy(
                    user -> user.getCreatedAt().toLocalDate().toString(),
                    Collectors.counting()
                ));
        stats.put("registrationsByDate", registrationsByDate);

        // Thống kê session theo ngày (7 ngày gần nhất)
        Map<String, Long> sessionsByDate = recentSessions.stream()
                .collect(Collectors.groupingBy(
                    session -> session.getCreatedAt().toLocalDate().toString(),
                    Collectors.counting()
                ));
        stats.put("sessionsByDate", sessionsByDate);

        // Top 5 người dùng hoạt động nhất
        List<Object[]> topActiveUsers = chatSessionRepository.findTopActiveUsers(5);
        List<Map<String, Object>> topUsers = topActiveUsers.stream()
                .map(row -> {
                    Map<String, Object> userMap = new HashMap<>();
                    User user = (User) row[0];
                    Long sessionCount = (Long) row[1];
                    userMap.put("id", user.getId());
                    userMap.put("fullName", user.getFullName());
                    userMap.put("email", user.getEmail());
                    userMap.put("sessionCount", sessionCount);
                    return userMap;
                })
                .collect(Collectors.toList());
        stats.put("topActiveUsers", topUsers);

        return stats;
    }

    public Map<String, Object> getUsers(Pageable pageable, String search) {
        Map<String, Object> result = new HashMap<>();
        
        Page<User> usersPage;
        if (search != null && !search.trim().isEmpty()) {
            usersPage = userRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                search.trim(), search.trim(), pageable);
        } else {
            usersPage = userRepository.findAll(pageable);
        }

        List<Map<String, Object>> users = usersPage.getContent().stream()
                .map(this::convertUserToMap)
                .collect(Collectors.toList());

        result.put("users", users);
        result.put("totalElements", usersPage.getTotalElements());
        result.put("totalPages", usersPage.getTotalPages());
        result.put("currentPage", usersPage.getNumber());
        result.put("size", usersPage.getSize());

        return result;
    }

    public Map<String, Object> getUserDetail(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        Map<String, Object> userDetail = convertUserToMap(user);
        
        // Thêm thống kê chi tiết
        long sessionCount = chatSessionRepository.countByUserAndIsActiveTrue(user);
        long messageCount = chatMessageRepository.countByUserMessages(userId);
        
        userDetail.put("sessionCount", sessionCount);
        userDetail.put("messageCount", messageCount);

        // Lấy 5 session gần nhất
        List<ChatSession> recentSessions = chatSessionRepository
                .findByUserAndIsActiveTrueOrderByUpdatedAtDesc(user)
                .stream()
                .limit(5)
                .collect(Collectors.toList());

        List<Map<String, Object>> sessions = recentSessions.stream()
                .map(this::convertSessionToMap)
                .collect(Collectors.toList());
        userDetail.put("recentSessions", sessions);

        return userDetail;
    }

    @Transactional
    public void updateUserStatus(Long userId, Boolean isActive) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        user.setIsActive(isActive);
        userRepository.save(user);
    }

    public Map<String, Object> getChatHistory(Pageable pageable, Long userId, String search) {
        Map<String, Object> result = new HashMap<>();
        
        Page<ChatSession> sessionsPage;
        if (userId != null) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
            if (search != null && !search.trim().isEmpty()) {
                sessionsPage = chatSessionRepository.findByUserAndTitleContainingIgnoreCase(
                    user, search.trim(), pageable);
            } else {
                sessionsPage = chatSessionRepository.findByUserAndIsActiveTrueOrderByUpdatedAtDesc(user, pageable);
            }
        } else {
            if (search != null && !search.trim().isEmpty()) {
                sessionsPage = chatSessionRepository.findByTitleContainingIgnoreCaseOrderByUpdatedAtDesc(
                    search.trim(), pageable);
            } else {
                sessionsPage = chatSessionRepository.findByIsActiveTrueOrderByUpdatedAtDesc(pageable);
            }
        }

        List<Map<String, Object>> sessions = sessionsPage.getContent().stream()
                .map(this::convertSessionToMapWithUser)
                .collect(Collectors.toList());

        result.put("sessions", sessions);
        result.put("totalElements", sessionsPage.getTotalElements());
        result.put("totalPages", sessionsPage.getTotalPages());
        result.put("currentPage", sessionsPage.getNumber());
        result.put("size", sessionsPage.getSize());

        return result;
    }

    public Map<String, Object> getAnalytics(int days) {
        Map<String, Object> analytics = new HashMap<>();
        
        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        
        // Thống kê đăng ký theo ngày
        List<Object[]> registrationStats = userRepository.getRegistrationStatsByDate(startDate);
        analytics.put("registrationStats", convertStatsToMap(registrationStats));

        // Thống kê session theo ngày
        List<Object[]> sessionStats = chatSessionRepository.getSessionStatsByDate(startDate);
        analytics.put("sessionStats", convertStatsToMap(sessionStats));

        // Thống kê tin nhắn theo ngày
        List<Object[]> messageStats = chatMessageRepository.getMessageStatsByDate(startDate);
        analytics.put("messageStats", convertMessageStatsToMap(messageStats));

        // Thống kê tokens
        Long totalTokens = chatMessageRepository.getTotalTokensUsedByUser(null, startDate);
        analytics.put("totalTokens", totalTokens != null ? totalTokens : 0);

        // Thời gian phản hồi trung bình
        Double avgResponseTime = chatMessageRepository.getAverageResponseTime(startDate);
        analytics.put("averageResponseTime", avgResponseTime != null ? avgResponseTime : 0);

        return analytics;
    }

    @Transactional
    public void deleteChatSession(Long sessionId) {
        ChatSession session = chatSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phiên chat"));
        session.setIsActive(false);
        chatSessionRepository.save(session);
    }

    // Helper methods
    private Map<String, Object> convertUserToMap(User user) {
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", user.getId());
        userMap.put("username", user.getUsername());
        userMap.put("email", user.getEmail());
        userMap.put("fullName", user.getFullName());
        userMap.put("phoneNumber", user.getPhoneNumber());
        userMap.put("isActive", user.getIsActive());
        userMap.put("createdAt", user.getCreatedAt());
        userMap.put("updatedAt", user.getUpdatedAt());
        userMap.put("roles", user.getRoles().stream()
                .map(role -> role.getName())
                .collect(Collectors.toList()));
        return userMap;
    }

    private Map<String, Object> convertSessionToMap(ChatSession session) {
        Map<String, Object> sessionMap = new HashMap<>();
        sessionMap.put("id", session.getId());
        sessionMap.put("title", session.getTitle());
        sessionMap.put("createdAt", session.getCreatedAt());
        sessionMap.put("updatedAt", session.getUpdatedAt());
        sessionMap.put("messageCount", session.getMessages().size());
        return sessionMap;
    }

    private Map<String, Object> convertSessionToMapWithUser(ChatSession session) {
        Map<String, Object> sessionMap = convertSessionToMap(session);
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("id", session.getUser().getId());
        userMap.put("fullName", session.getUser().getFullName());
        userMap.put("email", session.getUser().getEmail());
        sessionMap.put("user", userMap);
        return sessionMap;
    }

    private List<Map<String, Object>> convertStatsToMap(List<Object[]> stats) {
        return stats.stream()
                .map(row -> {
                    Map<String, Object> stat = new HashMap<>();
                    stat.put("date", row[0].toString());
                    stat.put("count", ((Number) row[1]).longValue());
                    return stat;
                })
                .collect(Collectors.toList());
    }

    private List<Map<String, Object>> convertMessageStatsToMap(List<Object[]> stats) {
        return stats.stream()
                .map(row -> {
                    Map<String, Object> stat = new HashMap<>();
                    stat.put("date", row[0].toString());
                    stat.put("count", ((Number) row[1]).longValue());
                    stat.put("messageType", row[2].toString());
                    return stat;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> updateAllUsersToFreePlan() {
        // Tìm tất cả user chưa có subscription plan hoặc có plan null
        List<User> usersToUpdate = userRepository.findAll().stream()
                .filter(user -> user.getSubscriptionPlan() == null)
                .collect(Collectors.toList());

        int updatedCount = 0;
        LocalDateTime now = LocalDateTime.now();

        for (User user : usersToUpdate) {
            user.setSubscriptionPlan(com.vietlaw.entity.SubscriptionPlan.FREE);
            user.setMonthlyMessageCount(0);
            user.setLastResetDate(now);
            userRepository.save(user);
            updatedCount++;
        }

        // Cũng update những user có subscription plan khác null nhưng chưa có message count
        List<User> usersToUpdateCount = userRepository.findAll().stream()
                .filter(user -> user.getSubscriptionPlan() != null && user.getMonthlyMessageCount() == null)
                .collect(Collectors.toList());

        for (User user : usersToUpdateCount) {
            user.setMonthlyMessageCount(0);
            if (user.getLastResetDate() == null) {
                user.setLastResetDate(now);
            }
            userRepository.save(user);
            updatedCount++;
        }

        Map<String, Object> result = new HashMap<>();
        result.put("updatedUsersCount", updatedCount);
        result.put("totalUsers", userRepository.count());
        result.put("message", "Đã cập nhật " + updatedCount + " người dùng với subscription plan FREE");

        return result;
    }
}
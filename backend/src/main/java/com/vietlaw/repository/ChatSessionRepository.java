package com.vietlaw.repository;

import com.vietlaw.entity.ChatSession;
import com.vietlaw.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    
    // Tìm tất cả session của user, sắp xếp theo thời gian cập nhật mới nhất
    List<ChatSession> findByUserAndIsActiveTrueOrderByUpdatedAtDesc(User user);
    
    // Tìm session với phân trang
    Page<ChatSession> findByUserAndIsActiveTrueOrderByUpdatedAtDesc(User user, Pageable pageable);
    
    // Tìm session theo ID và user (để bảo mật)
    Optional<ChatSession> findByIdAndUserAndIsActiveTrue(Long id, User user);
    
    // Đếm số session của user
    long countByUserAndIsActiveTrue(User user);
    
    // Tìm session được tạo trong khoảng thời gian
    @Query("SELECT cs FROM ChatSession cs WHERE cs.user = :user AND cs.isActive = true " +
           "AND cs.createdAt BETWEEN :startDate AND :endDate ORDER BY cs.updatedAt DESC")
    List<ChatSession> findByUserAndDateRange(@Param("user") User user, 
                                           @Param("startDate") LocalDateTime startDate, 
                                           @Param("endDate") LocalDateTime endDate);
    
    // Tìm session có chứa từ khóa trong title
    @Query("SELECT cs FROM ChatSession cs WHERE cs.user = :user AND cs.isActive = true " +
           "AND LOWER(cs.title) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY cs.updatedAt DESC")
    List<ChatSession> findByUserAndTitleContaining(@Param("user") User user, @Param("keyword") String keyword);
    
    // Thống kê số session theo ngày
    @Query("SELECT DATE(cs.createdAt) as date, COUNT(cs) as count FROM ChatSession cs " +
           "WHERE cs.isActive = true AND cs.createdAt >= :startDate GROUP BY DATE(cs.createdAt) ORDER BY date DESC")
    List<Object[]> getSessionStatsByDate(@Param("startDate") LocalDateTime startDate);
    
    // Admin queries
    List<ChatSession> findByCreatedAtAfter(LocalDateTime date);
    Page<ChatSession> findByIsActiveTrueOrderByUpdatedAtDesc(Pageable pageable);
    Page<ChatSession> findByTitleContainingIgnoreCaseOrderByUpdatedAtDesc(String title, Pageable pageable);
    Page<ChatSession> findByUserAndTitleContainingIgnoreCase(User user, String title, Pageable pageable);
    
    @Query("SELECT cs.user, COUNT(cs) FROM ChatSession cs WHERE cs.isActive = true " +
           "GROUP BY cs.user ORDER BY COUNT(cs) DESC")
    List<Object[]> findTopActiveUsers(@Param("limit") int limit);
}
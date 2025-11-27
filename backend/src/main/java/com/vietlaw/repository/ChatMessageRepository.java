package com.vietlaw.repository;

import com.vietlaw.entity.ChatMessage;
import com.vietlaw.entity.ChatSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    // Tìm tất cả tin nhắn trong session, sắp xếp theo thời gian tạo
    List<ChatMessage> findByChatSessionOrderByCreatedAtAsc(ChatSession chatSession);
    
    // Tìm tin nhắn với phân trang
    Page<ChatMessage> findByChatSessionOrderByCreatedAtAsc(ChatSession chatSession, Pageable pageable);
    
    // Đếm số tin nhắn trong session
    long countByChatSession(ChatSession chatSession);
    
    // Đếm số tin nhắn theo loại
    long countByChatSessionAndMessageType(ChatSession chatSession, ChatMessage.MessageType messageType);
    
    // Tìm tin nhắn cuối cùng trong session
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatSession = :session " +
           "ORDER BY cm.createdAt DESC LIMIT 1")
    ChatMessage findLastMessageInSession(@Param("session") ChatSession session);
    
    // Tìm tin nhắn chứa từ khóa
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatSession = :session " +
           "AND LOWER(cm.content) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY cm.createdAt ASC")
    List<ChatMessage> findByChatSessionAndContentContaining(@Param("session") ChatSession session, 
                                                          @Param("keyword") String keyword);
    
    // Thống kê tin nhắn theo ngày
    @Query("SELECT DATE(cm.createdAt) as date, COUNT(cm) as count, cm.messageType FROM ChatMessage cm " +
           "WHERE cm.createdAt >= :startDate GROUP BY DATE(cm.createdAt), cm.messageType ORDER BY date DESC")
    List<Object[]> getMessageStatsByDate(@Param("startDate") LocalDateTime startDate);
    
    // Tính tổng tokens đã sử dụng
    @Query("SELECT SUM(cm.tokensUsed) FROM ChatMessage cm WHERE cm.chatSession.user.id = :userId " +
           "AND cm.tokensUsed IS NOT NULL AND cm.createdAt >= :startDate")
    Long getTotalTokensUsedByUser(@Param("userId") Long userId, @Param("startDate") LocalDateTime startDate);
    
    // Tính thời gian phản hồi trung bình
    @Query("SELECT AVG(cm.responseTimeMs) FROM ChatMessage cm WHERE cm.messageType = 'AI' " +
           "AND cm.responseTimeMs IS NOT NULL AND cm.createdAt >= :startDate")
    Double getAverageResponseTime(@Param("startDate") LocalDateTime startDate);
    
    // Admin queries
    @Query("SELECT COUNT(cm) FROM ChatMessage cm WHERE cm.chatSession.user.id = :userId")
    long countByUserMessages(@Param("userId") Long userId);
}
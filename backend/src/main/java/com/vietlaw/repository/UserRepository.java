package com.vietlaw.repository;

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
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    // Admin queries
    long countByIsActiveTrue();
    List<User> findByCreatedAtAfter(LocalDateTime date);
    Page<User> findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
        String fullName, String email, Pageable pageable);
    
    @Query("SELECT DATE(u.createdAt) as date, COUNT(u) as count FROM User u " +
           "WHERE u.createdAt >= :startDate GROUP BY DATE(u.createdAt) ORDER BY date DESC")
    List<Object[]> getRegistrationStatsByDate(@Param("startDate") LocalDateTime startDate);
}
package com.vietlaw.service;

import com.vietlaw.entity.SubscriptionPlan;
import com.vietlaw.entity.User;
import com.vietlaw.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionService {

    private final UserRepository userRepository;

    public boolean canSendMessage(User user) {
        // Initialize subscription fields if null (for existing users)
        initializeSubscriptionFields(user);
        
        // Reset monthly count if it's a new month
        resetMonthlyCountIfNeeded(user);
        
        SubscriptionPlan plan = user.getSubscriptionPlan();
        if (plan.isUnlimited()) {
            return true;
        }
        
        return user.getMonthlyMessageCount() < plan.getMessageLimit();
    }

    @Transactional
    public void incrementMessageCount(User user) {
        // Initialize subscription fields if null (for existing users)
        initializeSubscriptionFields(user);
        
        // Reset monthly count if it's a new month
        resetMonthlyCountIfNeeded(user);
        
        user.setMonthlyMessageCount(user.getMonthlyMessageCount() + 1);
        userRepository.save(user);
        
        log.info("User {} message count incremented to {}/{}", 
                user.getUsername(), 
                user.getMonthlyMessageCount(), 
                user.getSubscriptionPlan().getMessageLimit());
    }

    public int getRemainingMessages(User user) {
        // Initialize subscription fields if null (for existing users)
        initializeSubscriptionFields(user);
        
        // Reset monthly count if it's a new month
        resetMonthlyCountIfNeeded(user);
        
        SubscriptionPlan plan = user.getSubscriptionPlan();
        if (plan.isUnlimited()) {
            return -1; // Unlimited
        }
        
        return Math.max(0, plan.getMessageLimit() - user.getMonthlyMessageCount());
    }

    @Transactional
    public void resetMonthlyCountIfNeeded(User user) {
        LocalDateTime now = LocalDateTime.now();
        YearMonth currentMonth = YearMonth.from(now);
        
        if (user.getLastResetDate() == null || 
            !YearMonth.from(user.getLastResetDate()).equals(currentMonth)) {
            
            user.setMonthlyMessageCount(0);
            user.setLastResetDate(now);
            userRepository.save(user);
            
            log.info("Reset monthly message count for user: {}", user.getUsername());
        }
    }

    @Transactional
    public void upgradeSubscription(User user, SubscriptionPlan newPlan) {
        user.setSubscriptionPlan(newPlan);
        userRepository.save(user);
        
        log.info("User {} upgraded to {} plan", user.getUsername(), newPlan);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        
        String username = authentication.getName();
        return userRepository.findByUsername(username).orElse(null);
    }

    @Transactional
    private void initializeSubscriptionFields(User user) {
        try {
            boolean needsSave = false;
            
            if (user.getSubscriptionPlan() == null) {
                user.setSubscriptionPlan(SubscriptionPlan.FREE);
                needsSave = true;
            }
            
            if (user.getMonthlyMessageCount() == null) {
                user.setMonthlyMessageCount(0);
                needsSave = true;
            }
            
            if (user.getLastResetDate() == null) {
                user.setLastResetDate(LocalDateTime.now());
                needsSave = true;
            }
            
            if (needsSave) {
                userRepository.save(user);
                log.info("Initialized subscription fields for user: {}", user.getUsername());
            }
        } catch (Exception e) {
            log.error("Error initializing subscription fields for user {}: {}", user.getUsername(), e.getMessage());
            // Set default values without saving to database
            if (user.getSubscriptionPlan() == null) {
                user.setSubscriptionPlan(SubscriptionPlan.FREE);
            }
            if (user.getMonthlyMessageCount() == null) {
                user.setMonthlyMessageCount(0);
            }
            if (user.getLastResetDate() == null) {
                user.setLastResetDate(LocalDateTime.now());
            }
        }
    }
}
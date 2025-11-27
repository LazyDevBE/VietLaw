package com.vietlaw.service;

import com.vietlaw.dto.request.LoginRequest;
import com.vietlaw.dto.request.RegisterRequest;
import com.vietlaw.dto.request.UpdateProfileRequest;
import com.vietlaw.dto.response.AuthResponse;
import com.vietlaw.entity.Role;
import com.vietlaw.entity.SubscriptionPlan;
import com.vietlaw.entity.User;
import com.vietlaw.repository.RoleRepository;
import com.vietlaw.repository.UserRepository;
import com.vietlaw.security.JwtUtils;
import com.vietlaw.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return new AuthResponse(jwt, user.getId(), user.getUsername(), 
                               user.getEmail(), user.getFullName(), roles,
                               user.getSubscriptionPlan().name(),
                               user.getMonthlyMessageCount(),
                               user.getSubscriptionPlan().getMessageLimit());
    }

    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email đã tồn tại!");
        }

        User user = new User();
        // Sử dụng email làm username
        user.setUsername(registerRequest.getEmail());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFullName(registerRequest.getFullName());
        user.setPhoneNumber(registerRequest.getPhoneNumber());

        // Set subscription plan mặc định là FREE
        user.setSubscriptionPlan(SubscriptionPlan.FREE);
        user.setMonthlyMessageCount(0);
        user.setLastResetDate(LocalDateTime.now());

        // Gán role USER mặc định
        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Role USER not found"));
        
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);

        // Tự động đăng nhập sau khi đăng ký
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getEmail(),
                        registerRequest.getPassword()
                )
        );

        String jwt = jwtUtils.generateJwtToken(authentication);

        Set<String> roleNames = savedUser.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return new AuthResponse(jwt, savedUser.getId(), savedUser.getUsername(),
                               savedUser.getEmail(), savedUser.getFullName(), roleNames,
                               savedUser.getSubscriptionPlan().name(),
                               savedUser.getMonthlyMessageCount(),
                               savedUser.getSubscriptionPlan().getMessageLimit());
    }

    public void changePassword(String currentPassword, String newPassword) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String email = userPrincipal.getEmail();
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        
        // Kiểm tra mật khẩu hiện tại
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new RuntimeException("Mật khẩu hiện tại không đúng");
        }
        
        // Cập nhật mật khẩu mới
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public AuthResponse updateProfile(UpdateProfileRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        String email = userPrincipal.getEmail();
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        
        // Cập nhật thông tin
        if (request.getFullName() != null && !request.getFullName().trim().isEmpty()) {
            user.setFullName(request.getFullName().trim());
        }
        
        if (request.getUsername() != null && !request.getUsername().trim().isEmpty()) {
            user.setUsername(request.getUsername().trim());
        }
        
        if (request.getPhone() != null && !request.getPhone().trim().isEmpty()) {
            user.setPhoneNumber(request.getPhone().trim());
        }
        
        // Lưu thay đổi
        User savedUser = userRepository.save(user);
        
        // Trả về thông tin đã cập nhật
        Set<String> roles = savedUser.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return new AuthResponse(null, savedUser.getId(), savedUser.getUsername(),
                               savedUser.getEmail(), savedUser.getFullName(), roles,
                               savedUser.getSubscriptionPlan().name(),
                               savedUser.getMonthlyMessageCount(),
                               savedUser.getSubscriptionPlan().getMessageLimit());
    }
}
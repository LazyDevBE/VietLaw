package com.vietlaw.service;

import com.vietlaw.entity.User;
import com.vietlaw.repository.UserRepository;
import com.vietlaw.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found: " + email));

        // Kiểm tra tài khoản có bị khóa không
        if (user.getIsActive() == null || !user.getIsActive()) {
            throw new UsernameNotFoundException("Tài khoản đã bị khóa: " + email);
        }

        return UserPrincipal.create(user);
    }
}
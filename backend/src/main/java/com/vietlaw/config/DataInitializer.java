package com.vietlaw.config;

import com.vietlaw.entity.Permission;
import com.vietlaw.entity.Role;
import com.vietlaw.entity.User;
import com.vietlaw.repository.PermissionRepository;
import com.vietlaw.repository.RoleRepository;
import com.vietlaw.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializePermissions();
        initializeRoles();
        initializeAdminUser();
    }

    private void initializePermissions() {
        if (permissionRepository.count() == 0) {
            Permission readPermission = new Permission("READ", "Quyền đọc");
            Permission writePermission = new Permission("WRITE", "Quyền ghi");
            Permission deletePermission = new Permission("DELETE", "Quyền xóa");
            Permission adminPermission = new Permission("ADMIN", "Quyền quản trị");

            permissionRepository.save(readPermission);
            permissionRepository.save(writePermission);
            permissionRepository.save(deletePermission);
            permissionRepository.save(adminPermission);

            log.info("Permissions initialized");
        }
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            // Tạo role USER
            Role userRole = new Role("USER", "Người dùng thông thường");
            Set<Permission> userPermissions = new HashSet<>();
            userPermissions.add(permissionRepository.findByName("READ").orElse(null));
            userRole.setPermissions(userPermissions);
            roleRepository.save(userRole);

            // Tạo role ADMIN
            Role adminRole = new Role("ADMIN", "Quản trị viên");
            Set<Permission> adminPermissions = new HashSet<>();
            adminPermissions.add(permissionRepository.findByName("READ").orElse(null));
            adminPermissions.add(permissionRepository.findByName("WRITE").orElse(null));
            adminPermissions.add(permissionRepository.findByName("DELETE").orElse(null));
            adminPermissions.add(permissionRepository.findByName("ADMIN").orElse(null));
            adminRole.setPermissions(adminPermissions);
            roleRepository.save(adminRole);

            log.info("Roles initialized");
        }
    }

    private void initializeAdminUser() {
        if (!userRepository.existsByEmail("admin@vietlaw.com")) {
            User admin = new User();
            admin.setUsername("admin@vietlaw.com");
            admin.setEmail("admin@vietlaw.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Administrator");
            admin.setPhoneNumber("0123456789");

            Role adminRole = roleRepository.findByName("ADMIN").orElse(null);
            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            admin.setRoles(roles);

            userRepository.save(admin);
            log.info("Admin user created: email=admin@vietlaw.com, password=admin123");
        }
    }
}
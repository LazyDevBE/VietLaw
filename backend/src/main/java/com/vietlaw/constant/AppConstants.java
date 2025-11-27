package com.vietlaw.constant;

public final class AppConstants {
    
    // JWT Constants
    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_PREFIX = "Bearer ";
    public static final long JWT_EXPIRATION_TIME = 86400000L; // 24 hours
    
    // Role Constants
    public static final String ROLE_USER = "USER";
    public static final String ROLE_ADMIN = "ADMIN";
    
    // API Response Messages
    public static final String LOGIN_SUCCESS = "Đăng nhập thành công";
    public static final String REGISTER_SUCCESS = "Đăng ký thành công";
    public static final String LOGOUT_SUCCESS = "Đăng xuất thành công";
    public static final String PASSWORD_CHANGE_SUCCESS = "Đổi mật khẩu thành công";
    public static final String PROFILE_UPDATE_SUCCESS = "Cập nhật thông tin thành công";
    
    // Error Messages
    public static final String INVALID_CREDENTIALS = "Tên đăng nhập hoặc mật khẩu không đúng";
    public static final String EMAIL_ALREADY_EXISTS = "Email đã tồn tại";
    public static final String USERNAME_ALREADY_EXISTS = "Tên đăng nhập đã tồn tại";
    public static final String USER_NOT_FOUND = "Không tìm thấy người dùng";
    public static final String INVALID_TOKEN = "Token không hợp lệ";
    public static final String ACCESS_DENIED = "Bạn không có quyền truy cập";
    
    // Subscription Plans
    public static final String PLAN_FREE = "FREE";
    public static final String PLAN_PLUS = "PLUS";
    public static final String PLAN_PRO = "PRO";
    
    // Message Limits
    public static final int FREE_PLAN_LIMIT = 30;
    public static final int PLUS_PLAN_LIMIT = 300;
    public static final int PRO_PLAN_LIMIT = -1; // Unlimited
    
    // Validation Constants
    public static final int MIN_PASSWORD_LENGTH = 6;
    public static final int MAX_PASSWORD_LENGTH = 100;
    public static final int MAX_USERNAME_LENGTH = 50;
    public static final int MAX_EMAIL_LENGTH = 100;
    public static final int MAX_FULLNAME_LENGTH = 100;
    
    // Private constructor to prevent instantiation
    private AppConstants() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
}
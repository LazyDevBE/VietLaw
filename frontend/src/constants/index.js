// API Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  DISPLAY_NAME: 'userDisplayName',
  CHAT_THEME: 'userChatTheme'
}

// Route Paths
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CHAT: '/chat',
  ADMIN: '/admin',
  PRICING: '/pricing',
  ABOUT: '/about',
  PROFILE: '/profile',
  MAINTENANCE: '/maintenance'
}

// User Roles
export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: 'FREE',
  PLUS: 'PLUS',
  PRO: 'PRO'
}

// Plan Limits
export const PLAN_LIMITS = {
  FREE: 30,
  PLUS: 300,
  PRO: -1 // Unlimited
}

// Plan Prices (VND)
export const PLAN_PRICES = {
  FREE: 0,
  PLUS: 299000,
  PRO: 699000
}

// Message Types
export const MESSAGE_TYPES = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT'
}

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  PHONE_REGEX: /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/
}

// UI Constants
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280
}

// Animation Durations (ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

// UI Layout Constants
export const LAYOUT = {
  NAVBAR_HEIGHT: 72,
  SIDEBAR_WIDTH: {
    MOBILE: 256, // 16rem
    DESKTOP: 320  // 20rem
  },
  CHAT_INPUT_DELAY: 100
}

// Event Names
export const EVENTS = {
  USER_CHANGED: 'userChanged',
  USER_LOGGED_OUT: 'userLoggedOut'
}
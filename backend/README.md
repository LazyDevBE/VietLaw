# VietLaw Backend

Backend REST API cho hệ thống tư vấn pháp lý AI VietLaw.

## 🚀 Tech Stack

- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Application framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **MySQL 8.0** - Database
- **JWT** - Token-based authentication
- **Gemini AI** - AI chat service
- **Maven** - Build tool

## 📁 Project Structure

```
backend/
├── src/main/java/com/vietlaw/
│   ├── config/           # Security & CORS configuration
│   ├── controller/       # REST Controllers
│   ├── dto/             # Request/Response DTOs
│   ├── entity/          # JPA Entities
│   ├── repository/      # Data repositories
│   ├── security/        # JWT & Security classes
│   ├── service/         # Business logic
│   └── VietLawApplication.java
├── src/main/resources/
│   ├── application.yml   # Main configuration
│   └── application-*.yml # Profile configurations
├── .env                 # Environment variables
├── .env.example         # Environment template
└── pom.xml             # Maven dependencies
```

## ⚙️ Quick Start

### Prerequisites
- Java 17+
- MySQL 8.0+
- Maven 3.6+

### 1. Database Setup
```sql
CREATE DATABASE vietlaw_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and update values:
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=vietlaw_db
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT (generate secure key)
JWT_SECRET=your_jwt_secret_key_here_minimum_256_bits
JWT_EXPIRATION=86400000

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

# Server
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### 3. Run Application
```bash
# Development
mvn spring-boot:run

# Production build
mvn clean package
java -jar target/vietlaw-backend-0.0.1-SNAPSHOT.jar
```

**Server runs at:** `http://localhost:8080/api`

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/auth/logout` | User logout |
| PUT | `/auth/profile` | Update profile |
| POST | `/auth/change-password` | Change password |

### Chat
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat/send` | Send message to AI |
| GET | `/chat/sessions` | Get user chat sessions |
| GET | `/chat/messages/{sessionId}` | Get chat messages |

### Admin (Requires ADMIN role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Dashboard statistics |
| GET | `/admin/users` | User management |
| PUT | `/admin/users/{id}/status` | Lock/unlock user |
| GET | `/admin/chat-history` | Chat history |

### Test Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/test/public` | Public test endpoint |
| GET | `/test/user` | User test endpoint |
| GET | `/test/admin` | Admin test endpoint |

## 📝 API Examples

### User Registration
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456",
  "fullName": "Test User",
  "phoneNumber": "0123456789"
}
```

### Send Chat Message
```http
POST /api/chat/send
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Tôi muốn hỏi về quyền lợi của người lao động",
  "sessionId": null
}
```

### Admin Dashboard
```http
GET /api/admin/dashboard
Authorization: Bearer <admin-token>
```

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts and profiles
- **roles** - User roles (USER, ADMIN)
- **permissions** - System permissions
- **chat_sessions** - Chat conversations
- **chat_messages** - Individual messages

### Relationships
```
Users (1) ←→ (N) ChatSessions (1) ←→ (N) ChatMessages
Users (N) ←→ (N) Roles (N) ←→ (N) Permissions
```

### Default Data
- **Admin Account**: admin@vietlaw.com / admin123
- **Roles**: USER, ADMIN
- **Permissions**: READ, WRITE, DELETE, ADMIN

## 🔐 Security Features

### Authentication & Authorization
- JWT token-based authentication
- Role-based access control (RBAC)
- Account lock/unlock functionality
- Password encryption with BCrypt

### Security Configuration
- CORS configuration for frontend
- SQL injection protection via JPA
- Input validation and sanitization
- Secure JWT secret management

### Account Management
- User registration and login
- Profile management
- Password change functionality
- Admin user management with lock/unlock

## 🎯 Business Logic

### Subscription Plans
| Plan | Messages/Month | Price | Features |
|------|----------------|-------|----------|
| FREE | 30 | Free | Basic chat |
| PLUS | 300 | 299,000đ | Extended chat |
| PRO | Unlimited | 699,000đ | Unlimited + priority |

### AI Integration
- Gemini AI for legal consultation
- Vietnamese language support
- Context-aware responses
- Session-based conversations

## 🔧 Configuration

### Environment Profiles
- **default** - Development with MySQL
- **test** - Testing with H2 database
- **prod** - Production optimized

### Key Configuration Files
- `application.yml` - Main configuration
- `application-test.yml` - Test configuration
- `.env` - Environment variables
- `SecurityConfig.java` - Security settings

## 🚀 Deployment

### Local Development
```bash
mvn spring-boot:run
```

### Production Build
```bash
mvn clean package
java -jar target/vietlaw-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### Docker (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/vietlaw-backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

**JWT Token Error**
- Check JWT secret configuration
- Verify token format: `Bearer <token>`

**CORS Error**
- Add frontend URL to `CORS_ALLOWED_ORIGINS`
- Check allowed methods and headers

**Port Already in Use**
- Change `SERVER_PORT` in `.env`
- Kill process using port 8080

### Debug Mode
```bash
mvn spring-boot:run -Dspring-boot.run.arguments="--logging.level.com.vietlaw=DEBUG"
```

## 📊 Monitoring

### Health Check
```http
GET /api/actuator/health
```

### Logging
- Application logs: `logs/vietlaw-backend.log`
- Debug level: Configurable per package
- SQL logging: Available in development

## 🤝 Development

### Code Style
- Follow Java naming conventions
- Use meaningful variable names
- Add JavaDoc for public methods
- Keep methods concise

### Git Workflow
```bash
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### Testing
```bash
# Run all tests
mvn test

# Run specific test
mvn test -Dtest=AuthControllerTest
```

## 📞 Support

- **Issues**: GitHub Issues
- **Documentation**: This README
- **Contact**: dev@vietlaw.vn

---

**VietLaw Backend** - Secure, scalable legal consultation API 🏛️⚖️
package com.vietlaw.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GeminiService {

    private final String apiKey = "AIzaSyDIf3qW0l0BVheLoCbPuKH-9ZVqxZBvlC0";
    private final String model = "gemini-2.5-flash";

    public String generateResponse(String userMessage, List<Map<String, String>> conversationHistory) {
        try {
            log.info("Generating response for user message: {}", userMessage.substring(0, Math.min(50, userMessage.length())));
            log.info("Using API key: {}...", apiKey != null ? apiKey.substring(0, Math.min(10, apiKey.length())) : "null");
            log.info("Using model: {}", model);

            // API key is now hardcoded, so this check is simplified
            log.info("Using hardcoded Gemini API key");

            // Tạo system instruction cho legal assistant
            String systemInstruction = """
                Bạn là một trợ lý pháp lý AI chuyên nghiệp tại Việt Nam. Nhiệm vụ của bạn là:
                
                1. Cung cấp thông tin pháp lý chính xác theo luật pháp Việt Nam
                2. Giải thích các khái niệm pháp lý một cách dễ hiểu
                3. Đưa ra lời khuyên pháp lý phù hợp với tình huống cụ thể
                4. Luôn nhắc nhở người dùng tham khảo ý kiến luật sư chuyên nghiệp khi cần thiết
                5. Trả lời bằng tiếng Việt một cách lịch sự và chuyên nghiệp
                
                Lưu ý: Chỉ trả lời các câu hỏi liên quan đến pháp luật. Nếu câu hỏi không liên quan, 
                hãy lịch sự từ chối và hướng dẫn người dùng đặt câu hỏi pháp lý.
                """;

            // Tạo request body với system instruction
            String requestBody = String.format("""
                {
                    "system_instruction": {
                        "parts": [{"text": "%s"}]
                    },
                    "contents": [{
                        "role": "user",
                        "parts": [{"text": "%s"}]
                    }],
                    "generationConfig": {
                        "temperature": 0.7,
                        "maxOutputTokens": 2048
                    }
                }
                """, systemInstruction.replace("\"", "\\\""), userMessage.replace("\"", "\\\""));

            // Gọi Gemini API với HttpClient
            String url = String.format("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s", 
                                     model, apiKey);

            HttpClient client = HttpClient.newBuilder()
                    .connectTimeout(Duration.ofSeconds(10))
                    .build();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .timeout(Duration.ofSeconds(30))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            log.info("Gemini API response status: {}", response.statusCode());

            if (response.statusCode() == 200) {
                // Parse response đơn giản
                String responseBody = response.body();
                
                // Parse JSON response
                if (responseBody.contains("\"candidates\"") && responseBody.contains("\"content\"")) {
                    // Tìm text trong parts array
                    int partsStart = responseBody.indexOf("\"parts\":");
                    if (partsStart != -1) {
                        int textStart = responseBody.indexOf("\"text\":", partsStart);
                        if (textStart != -1) {
                            textStart = responseBody.indexOf("\"", textStart + 7) + 1;
                            int textEnd = responseBody.indexOf("\"", textStart);
                            if (textEnd != -1) {
                                String aiResponse = responseBody.substring(textStart, textEnd);
                                // Unescape JSON
                                aiResponse = aiResponse.replace("\\n", "\n").replace("\\\"", "\"");
                                
                                log.info("Successfully generated AI response ({} characters)", aiResponse.length());
                                return aiResponse;
                            }
                        }
                    }
                    
                    // Fallback: check if response was truncated
                    if (responseBody.contains("\"finishReason\": \"MAX_TOKENS\"")) {
                        log.warn("Response was truncated due to max tokens limit");
                        return "Xin lỗi, câu trả lời quá dài. Vui lòng đặt câu hỏi ngắn gọn hơn hoặc chia nhỏ câu hỏi.";
                    }
                }
                
                log.warn("Could not parse AI response from: {}", responseBody);
                return "Xin lỗi, không thể phân tích phản hồi từ AI. Vui lòng thử lại.";
                
            } else {
                log.error("Gemini API error - Status: {}, Body: {}", response.statusCode(), response.body());
                
                if (response.statusCode() == 403) {
                    return "Xin lỗi, API key không có quyền truy cập Gemini API. Vui lòng kiểm tra cấu hình.";
                } else if (response.statusCode() == 429) {
                    return "Xin lỗi, đã vượt quá giới hạn API. Vui lòng thử lại sau.";
                } else {
                    return "Xin lỗi, có lỗi khi gọi Gemini API. Vui lòng thử lại sau.";
                }
            }

        } catch (Exception e) {
            log.error("Exception in GeminiService: ", e);
            return "Xin lỗi, đã có lỗi xảy ra khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.";
        }
    }

    public String generateSessionTitle(String firstMessage) {
        // Đơn giản hóa title generation
        if (firstMessage.length() > 50) {
            return firstMessage.substring(0, 50) + "...";
        }
        return firstMessage;
    }

    public Integer estimateTokens(String text) {
        return Math.max(1, text.length() / 4);
    }
}

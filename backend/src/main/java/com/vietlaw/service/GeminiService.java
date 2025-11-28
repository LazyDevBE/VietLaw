package com.vietlaw.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GeminiService {

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    public String generateResponse(String userMessage, List<Map<String, String>> conversationHistory) {
        try {
            log.info("Generating response for user message: {}", userMessage.substring(0, Math.min(50, userMessage.length())));

            if (apiKey == null || apiKey.isEmpty() || "your-gemini-api-key-here".equals(apiKey)) {
                log.error("Gemini API key not configured properly");
                return "Xin lỗi, API key chưa được cấu hình. Vui lòng kiểm tra cấu hình.";
            }

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

            // Build request body using conversation history to keep context
            List<Map<String, Object>> contents = new ArrayList<>();
            for (Map<String, String> msg : conversationHistory) {
                Map<String, Object> contentItem = new HashMap<>();
                String role = "user".equalsIgnoreCase(msg.get("role")) ? "user" : "model";
                contentItem.put("role", role);
                List<Map<String, String>> parts = List.of(Map.of("text", msg.get("content")));
                contentItem.put("parts", parts);
                contents.add(contentItem);
            }

            Map<String, Object> body = new HashMap<>();
            body.put("system_instruction", Map.of("parts", List.of(Map.of("text", systemInstruction))));
            body.put("contents", contents);
            body.put("generationConfig", Map.of(
                    "temperature", 0.7,
                    "maxOutputTokens", 2048
            ));

            ObjectMapper mapper = new ObjectMapper();
            String requestBody = mapper.writeValueAsString(body);

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
                String responseBody = response.body();

                // Parse JSON response properly to avoid truncation
                JsonNode root = mapper.readTree(responseBody);
                JsonNode candidates = root.path("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode partsNode = candidates.get(0).path("content").path("parts");
                    if (partsNode.isArray() && partsNode.size() > 0) {
                        StringBuilder sb = new StringBuilder();
                        for (JsonNode part : partsNode) {
                            if (part.has("text")) {
                                sb.append(part.get("text").asText());
                            }
                        }
                        String aiResponse = sb.toString().trim();
                        if (!aiResponse.isEmpty()) {
                            log.info("Successfully generated AI response ({} characters)", aiResponse.length());
                            return aiResponse;
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

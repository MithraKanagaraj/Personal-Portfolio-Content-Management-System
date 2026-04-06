package com.example.springapp.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException ex,
                                                                             HttpServletRequest request) {
        HttpStatus status = HttpStatus.valueOf(ex.getStatusCode().value());
        return buildResponse(status, ex.getReason(), request.getRequestURI());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> handleDataIntegrityViolation(DataIntegrityViolationException ex,
                                                                            HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST,
                "Database constraint error. Check duplicate or missing values.",
                request.getRequestURI());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex,
                                                                         HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, "Invalid request body", request.getRequestURI());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex,
                                                                      HttpServletRequest request) {
        ex.printStackTrace();
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                "Something went wrong on the server",
                request.getRequestURI());
    }

    private ResponseEntity<Map<String, Object>> buildResponse(HttpStatus status, String message, String path) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        body.put("path", path);
        return ResponseEntity.status(status).body(body);
    }
}

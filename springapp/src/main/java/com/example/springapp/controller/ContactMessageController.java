package com.example.springapp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.ContactMessage;
import com.example.springapp.service.ContactMessageService;

@RestController
@RequestMapping("/api/messages")
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    @PostMapping("/{username}")
    public ResponseEntity<ContactMessage> sendMessage(@RequestBody ContactMessage message,
                                                      @PathVariable String username) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.sendMessage(message, username));
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getMessages(Principal principal) {
        return ResponseEntity.ok(service.getMessages(getAuthenticatedEmail(principal)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteMessage(@PathVariable Long id, Principal principal) {
        service.deleteMessage(id, getAuthenticatedEmail(principal));
        return ResponseEntity.ok(Map.of("message", "Message deleted successfully"));
    }

    private String getAuthenticatedEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return principal.getName();
    }
}

package com.example.springapp.controller;


import com.example.springapp.entity.ContactMessage;
import com.example.springapp.service.ContactMessageService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin("*")
public class ContactMessageController {

    private final ContactMessageService service;

    public ContactMessageController(ContactMessageService service) {
        this.service = service;
    }

    // Public send message
    @PostMapping("/{username}")
    public ContactMessage sendMessage(@RequestBody ContactMessage message,
                                      @PathVariable String username) {
        return service.sendMessage(message, username);
    }

    // Admin view messages
    @GetMapping
    public List<ContactMessage> getMessages(Principal principal) {
        return service.getMessages(principal.getName());
    }
}
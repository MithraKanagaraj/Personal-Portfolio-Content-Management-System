
package com.example.springapp.service;

import com.example.springapp.entity.ContactMessage;

import java.util.List;

public interface ContactMessageService {
    ContactMessage sendMessage(ContactMessage message, String username);
    List<ContactMessage> getMessages(String email);
}
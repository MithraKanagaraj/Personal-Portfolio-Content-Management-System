package com.example.springapp.service;

import java.util.List;

import com.example.springapp.entity.ContactMessage;

public interface ContactMessageService {

    ContactMessage sendMessage(ContactMessage message, String username);

    List<ContactMessage> getMessages(String email);

    void deleteMessage(Long id, String email);
}

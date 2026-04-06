package com.example.springapp.serviceimpl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.ContactMessage;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ContactMessageRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ContactMessageService;

@Service
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository repository;
    private final UserRepository userRepository;

    public ContactMessageServiceImpl(ContactMessageRepository repository,
                                     UserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Override
    public ContactMessage sendMessage(ContactMessage message, String username) {
        if (message == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Message body is required");
        }
        if (!StringUtils.hasText(message.getSenderName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "senderName is required");
        }
        if (!StringUtils.hasText(message.getSenderEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "senderEmail is required");
        }
        if (!StringUtils.hasText(message.getMessage())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "message is required");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Portfolio user not found"));

        ContactMessage newMessage = new ContactMessage();
        newMessage.setSenderName(message.getSenderName().trim());
        newMessage.setSenderEmail(message.getSenderEmail().trim().toLowerCase());
        newMessage.setMessage(message.getMessage().trim());
        newMessage.setUser(user);
        return repository.save(newMessage);
    }

    @Override
    public List<ContactMessage> getMessages(String email) {
        User user = getUserByEmail(email);
        return repository.findByUser(user);
    }

    @Override
    public void deleteMessage(Long id, String email) {
        User user = getUserByEmail(email);
        ContactMessage message = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Message not found for this user"));
        repository.delete(message);
    }

    private User getUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}

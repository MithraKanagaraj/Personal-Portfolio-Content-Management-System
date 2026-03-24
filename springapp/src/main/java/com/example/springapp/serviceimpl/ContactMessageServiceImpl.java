package com.example.springapp.serviceimpl;



import com.example.springapp.entity.ContactMessage;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ContactMessageRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ContactMessageService;

import org.springframework.stereotype.Service;

import java.util.List;

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
        User user = userRepository.findByUsername(username).orElseThrow();
        message.setUser(user);
        return repository.save(message);
    }

    @Override
    public List<ContactMessage> getMessages(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return repository.findByUser(user);
    }
}
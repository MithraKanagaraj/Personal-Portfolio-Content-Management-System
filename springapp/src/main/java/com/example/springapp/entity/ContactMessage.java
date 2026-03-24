
package com.example.springapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String senderName;
    private String senderEmail;

    @Column(length = 2000)
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ContactMessage() {}

    public Long getId() { return id; }
    public String getSenderName() { return senderName; }
    public String getSenderEmail() { return senderEmail; }
    public String getMessage() { return message; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setSenderName(String senderName) { this.senderName = senderName; }
    public void setSenderEmail(String senderEmail) { this.senderEmail = senderEmail; }
    public void setMessage(String message) { this.message = message; }
    public void setUser(User user) { this.user = user; }
}
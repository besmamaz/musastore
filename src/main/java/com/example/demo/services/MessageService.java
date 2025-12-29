package com.example.demo.services;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Message;
import com.example.demo.repositries.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message saveMessage(Message msg) {
        return messageRepository.save(msg);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message replyToMessage(Long id, String reponse) {
        Message msg = messageRepository.findById(id).orElseThrow();
        msg.setReponse(reponse);
        msg.setRepondu(true);
        return messageRepository.save(msg);
    }
}

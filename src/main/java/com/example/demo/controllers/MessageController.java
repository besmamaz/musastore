package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Message;
import com.example.demo.repositries.MessageRepository;
import com.example.demo.services.MessageService;
@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:5173")
public class MessageController {

    @Autowired
    private MessageService messageService;
   @Autowired
    private MessageRepository messageRepository;



   

    @GetMapping
    public List<Message> getMessages() {
        return messageService.getAllMessages();
    }
     // ✅ Ajouter un nouveau message (visiteur ou client)
    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        return messageRepository.save(message);
    }

    // ✅ Supprimer un message
@Transactional
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
    if (messageRepository.existsById(id)) {
        messageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}





     @PutMapping("/{id}/repondre")
    public Message repondreMessage(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String reponse = body.get("reponse");

        Message message = messageRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Message introuvable")
        );

        message.setReponse(reponse);
        message.setRepondu(true);
        return messageRepository.save(message);
    }
}

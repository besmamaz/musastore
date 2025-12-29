package com.example.demo.controllers;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.internet.MimeMessage;

@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    public static class EmailRequest {
        private Long id; // ID de la réponse à mettre à jour
        private String to;
        private String subject;
        private String body;

        public String getTo() { return to; }
        public void setTo(String to) { this.to = to; }
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
        public String getBody() { return body; }
        public void setBody(String body) { this.body = body; }
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(request.getTo());
            helper.setSubject(request.getSubject());

            // HTML template avec couleurs roses
            String htmlContent = "<html>"
                    + "<body style=\"font-family: Arial, sans-serif; background-color: #fff0f5; padding: 20px;\">"
                    + "<div style=\"max-width: 600px; margin: auto; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                    + "<div style=\"text-align: center;\">"
                    + "<img src='cid:logoImage' alt='Logo' style='width:150px; height:150px; border-radius:50%; object-fit:cover;'/>"
                    + "</div>"
                    + "<h2 style=\"color: #d63384;\">Response for your question</h2>"
                    + "<p style=\"font-size: 16px; color: #333;\">" + request.getBody() + "</p>"
                    + "<hr style=\"border:none; border-top:1px solid #f0c0d6; margin:20px 0;\" />"
                    + "<p style=\"text-align:center; color: #d63384;\">Thank You For Your Trust !</p>"
                    + "</div>"
                    + "</body>"
                    + "</html>";

            helper.setText(htmlContent, true); // true = HTML

            // Ajouter l'image inline depuis le dossier static
            FileSystemResource res = new FileSystemResource(
                    new File("src/main/resources/static/assets/photo_2025-11-08_00-25-20.jpg")
            );
            helper.addInline("logoImage", res);

            mailSender.send(message);

            return ResponseEntity.ok("Email envoyé avec succès !");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors de l'envoi de l'email");
        }
    }
}

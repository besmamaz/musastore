package com.example.demo.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Article;
import com.example.demo.models.Images;
import com.example.demo.repositries.ArticleRepository;
import com.example.demo.repositries.ImagesRepository;

@RestController
@RequestMapping("/api")
public class ImagesController {

    @Autowired
    private ArticleRepository articleRepository; // ✅ ici

    @Autowired
    private ImagesRepository imagesRepository; // ✅ ici

    @PostMapping("/articles/{id}/images")
    public ResponseEntity<?> uploadImages(
            @PathVariable int id,
            @RequestParam("images") List<MultipartFile> files) {

        Article article = articleRepository.findById(id).orElse(null);
        if (article == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article introuvable");
        }

        List<Images> uploadedImages = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            try {
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());

                Images img = new Images();
                img.setImageurl("/uploads/" + fileName);
                img.setArticle(article);
                imagesRepository.save(img);
                uploadedImages.add(img);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return ResponseEntity.ok(uploadedImages);
    }
}

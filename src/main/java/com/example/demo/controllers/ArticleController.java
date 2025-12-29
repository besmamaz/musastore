package com.example.demo.controllers;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.AddArticleRequest;
import com.example.demo.models.Article;
import com.example.demo.models.Categorie;
import com.example.demo.models.Images;
import com.example.demo.repositries.ArticleRepository;
import com.example.demo.repositries.CategorieRepository;
import com.example.demo.repositries.ImagesRepository;
import com.example.demo.services.ArticleService;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin(origins = "http://localhost:5173")
public class ArticleController {
    
    private final ArticleService articleService;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ImagesRepository imagesRepository;

    public ArticleController(ArticleService service) {
        this.articleService = service;
    }

    // ————— création article + images en multipart
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<Article> createArticle(@ModelAttribute AddArticleRequest req) throws IOException {
    try {
        // 1. Catégorie
        Categorie cat = categorieRepository.findByNamecatalogue(req.getCategoryName())
                .orElseGet(() -> {
                    Categorie newCat = new Categorie();
                    newCat.setNamecatalogue(req.getCategoryName());
                    return categorieRepository.save(newCat);
                });

        // 2. Article
        Article article = new Article();
        article.setNamearticle(req.getNamearticle());
        article.setDescription(req.getDescription());
        article.setPrice(req.getPrice());
        article.setCategorie(cat);

        // 3. Upload des images
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads"; // Chemin absolu
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        if (req.getImages() != null && req.getImages().length > 0) {
            for (MultipartFile file : req.getImages()) {
                if (!file.isEmpty()) {
                    // nom unique pour éviter les conflits
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    file.transferTo(new File(dir, fileName));

                    Images img = new Images();
                    img.setImageurl("/uploads/" + fileName);
                    img.setArticle(article);
                    article.getImages().add(img);
                }
            }
        }

        Article saved = articleRepository.save(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null);
    }
}


@DeleteMapping("/{id}")
    public ResponseEntity<?> deleteArticle(@PathVariable int id) {
        try {
            articleService.deleteArticle(id);
            return ResponseEntity.ok("Article supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    // ————— liste de tous les articles avec leurs images et catégories
    @GetMapping
    public List<Article> list() {
        return articleService.getAllArticles();
    }
@PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<Article> updateArticle(@PathVariable int id, @ModelAttribute AddArticleRequest req) throws IOException {
    try {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article non trouvé avec ID: " + id));

        // 1️⃣ Mise à jour des champs
        article.setNamearticle(req.getNamearticle());
        article.setDescription(req.getDescription());
        article.setPrice(req.getPrice());

        // 2️⃣ Mise à jour catégorie
        if (req.getCategoryName() != null && !req.getCategoryName().isEmpty()) {
            Categorie cat = categorieRepository.findByNamecatalogue(req.getCategoryName())
                    .orElseGet(() -> {
                        Categorie newCat = new Categorie();
                        newCat.setNamecatalogue(req.getCategoryName());
                        return categorieRepository.save(newCat);
                    });
            article.setCategorie(cat);
        }

        // 3️⃣ Gestion des nouvelles images (si envoyées)
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        if (req.getImages() != null && req.getImages().length > 0) {
            // Supprimer les anciennes images si besoin
            imagesRepository.deleteAll(article.getImages());
            article.getImages().clear();

            // Ajouter les nouvelles
            for (MultipartFile file : req.getImages()) {
                if (!file.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    file.transferTo(new File(dir, fileName));

                    Images img = new Images();
                    img.setImageurl("/uploads/" + fileName);
                    img.setArticle(article);
                    article.getImages().add(img);
                }
            }
        }

        // 4️⃣ Sauvegarde finale
        Article updated = articleRepository.save(article);
        return ResponseEntity.ok(updated);

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}

    
}

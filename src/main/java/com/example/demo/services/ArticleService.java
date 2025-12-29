package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.models.Article;
import com.example.demo.repositries.ArticleRepository;  // ← هذا هو الأكثر استعمالاً

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public List<Article> getArticlesByCategorie(int idCategorie) {
        return articleRepository.findByCategorie_Idcategorie(idCategorie);
    }

    public Article saveArticle(Article article) {
        return articleRepository.save(article);
    }

     @Transactional // ← مهمة باش يتم الحذف في نفس الترانزكشن
    public void deleteArticle(int id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article introuvable avec id " + id));

        // مع الـ cascade + orphanRemoval ما تحتاجي تمسحي الصور أو الـ panierArticles يدوياً
        articleRepository.delete(article);
    }
}

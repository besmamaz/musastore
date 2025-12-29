package com.example.demo.services;

import com.example.demo.models.PanierArticle;
import com.example.demo.repositries.PanierArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PanierArticleService {
    private final PanierArticleRepository panierArticleRepository;

    public PanierArticleService(PanierArticleRepository panierArticleRepository) {
        this.panierArticleRepository = panierArticleRepository;
    }

    public PanierArticle addArticleToPanier(PanierArticle panierArticle) {
        return panierArticleRepository.save(panierArticle);
    }

    public List<PanierArticle> getArticlesByPanier(int idPanier) {
        return panierArticleRepository.findByPanier_Idpanier(idPanier);
    }

    public void removeArticleFromPanier(int id) {
        panierArticleRepository.deleteById(id);
    }
}

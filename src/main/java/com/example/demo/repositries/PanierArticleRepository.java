package com.example.demo.repositries;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.PanierArticle; 
@Repository
public interface PanierArticleRepository extends JpaRepository<PanierArticle, Integer> {
    List<PanierArticle> findByPanier_Idpanier(int idpanier); // articles dans un panier
}

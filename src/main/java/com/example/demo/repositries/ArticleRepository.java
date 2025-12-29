package com.example.demo.repositries;

import java.util.List;
import java.util.Optional; // هادي مهمة إذا تستعملي Optional

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    List<Article> findByCategorie_Idcategorie(int idcategorie);

    // ما تديريش Object, الأفضل تستعملي Optional<Article>
    Optional<Article> findById(Integer id);
    @Query("SELECT a.namearticle, SUM(pa.quantite) " +
       "FROM PanierArticle pa JOIN pa.article a " +
       "GROUP BY a.namearticle ORDER BY SUM(pa.quantite) DESC")
List<Object[]> getTopProduits();

}

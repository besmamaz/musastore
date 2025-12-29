package com.example.demo.repositries;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Categorie;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Integer> {

    // 🔹 Spring va automatiquement générer la requête :
    Optional<Categorie> findByNamecatalogue(String namecatalogue);
}

package com.example.demo.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore; // ⬅️ AJOUTER ÇA

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Categorie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idcategorie;

    private String namecatalogue;

    @OneToMany(mappedBy = "categorie")
    @JsonIgnore  // ⬅️ AJOUTER ÇA pour éviter la récursion infinie
    private List<Article> articles;

    // Getters & Setters
    public int getIdcategorie() {
        return idcategorie;
    }

    public void setIdcategorie(int idcategorie) {
        this.idcategorie = idcategorie;
    }

    public String getNamecatalogue() {
        return namecatalogue;
    }

    public void setNamecatalogue(String namecatalogue) {
        this.namecatalogue = namecatalogue;
    }

    public List<Article> getArticles() {
        return articles;
    }

    public void setArticles(List<Article> articles) {
        this.articles = articles;
    }
}

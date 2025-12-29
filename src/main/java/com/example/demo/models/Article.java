package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idarticle;

    private String namearticle;
    private String taille;
    private String description;
    private double price;

    @ManyToOne
    @JoinColumn(name = "idcategorie")
    private Categorie categorie;

    @OneToMany(
        mappedBy = "article",
        cascade = CascadeType.ALL,      // ✅ majuscules et PAS de parenthèses
        orphanRemoval = true            // ✅ booléen
    )
    @JsonManagedReference
    private List<Images> images = new ArrayList<>();



    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
@JsonBackReference // ✅ empêche de reboucler vers PanierArticle
private List<PanierArticle> panierArticles;

    // --- Getters & Setters ---

    public int getIdarticle() {
        return idarticle;
    }

    public void setIdarticle(int idarticle) {
        this.idarticle = idarticle;
    }

    public String getNamearticle() {
        return namearticle;
    }

    public void setNamearticle(String namearticle) {
        this.namearticle = namearticle;
    }

    public String getTaille() {
        return taille;
    }

    public void setTaille(String taille) {
        this.taille = taille;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public List<Images> getImages() {
        return images;
    }

    public void setImages(List<Images> images) {
        this.images = images;
    }

    public List<PanierArticle> getPanierArticles() {   // ✅ getter
        return panierArticles;
    }

    public void setPanierArticles(List<PanierArticle> panierArticles) {  // ✅ setter
        this.panierArticles = panierArticles;
    }
}
package com.example.demo.models;

import java.util.List;

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
public class Panier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idpanier;

    private String prixtotale;

    @ManyToOne
    @JoinColumn(name = "idclient")
    private Client client;

    @OneToMany(mappedBy = "panier", cascade = CascadeType.ALL)
@JsonManagedReference // ✅ le panier “gère” la liste des PanierArticles
private List<PanierArticle> panierArticles;


    // --- Getters & Setters ---

    public int getIdpanier() {
        return idpanier;
    }

    public void setIdpanier(int idpanier) {
        this.idpanier = idpanier;
    }

    public String getPrixtotale() {
        return prixtotale;
    }

    public void setPrixtotale(String prixtotale) {
        this.prixtotale = prixtotale;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<PanierArticle> getPanierArticles() {   // ✅ getter
        return panierArticles;
    }

    public void setPanierArticles(List<PanierArticle> panierArticles) {  // ✅ setter
        this.panierArticles = panierArticles;
    }
}

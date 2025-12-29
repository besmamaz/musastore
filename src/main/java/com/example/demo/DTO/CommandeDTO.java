package com.example.demo.DTO;

import java.util.Date;
import java.util.List;

public class CommandeDTO {
    private int id;
    private String numero;
    private Date date;
    private String status;
    private double montant;
    private long clientId;
    private String clientNom;
    private String adresseLivraison;
    private ClientDTO client; // ✅ client complet
    private PaiementDTO paiement; // ✅ infos paiement

    private List<ArticleDTO> articles; // ✅ liste complète des articles

    // --- Getters & Setters ---
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public double getMontant() { return montant; }
    public void setMontant(double montant) { this.montant = montant; }

    public long getClientId() { return clientId; }
    public void setClientId(long clientId) { this.clientId = clientId; }

    public String getClientNom() { return clientNom; }
    public void setClientNom(String clientNom) { this.clientNom = clientNom; }

    public List<ArticleDTO> getArticles() { return articles; }
    public void setArticles(List<ArticleDTO> articles) { this.articles = articles; }
    public String getadresseLivraison() { return adresseLivraison; }
    public void setadresseLivraison(String adresseLivraison) { this.adresseLivraison = adresseLivraison; }
    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public PaiementDTO getPaiement() {
        return paiement;
    }

    public void setPaiement(PaiementDTO paiement) {
        this.paiement = paiement;
    }
}

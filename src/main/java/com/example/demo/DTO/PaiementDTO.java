package com.example.demo.DTO;

import java.time.LocalDateTime;

public class PaiementDTO {
    private int idpaiement;
    private double montant;
    private String modePaiement;
    private String statut;
    private String adresseFacturation;
    private LocalDateTime datePaiement;

    // Getters et setters
    public int getIdpaiement() {
        return idpaiement;
    }

    public void setIdpaiement(int idpaiement) {
        this.idpaiement = idpaiement;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public String getModePaiement() {
        return modePaiement;
    }

    public void setModePaiement(String modePaiement) {
        this.modePaiement = modePaiement;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getAdresseFacturation() {
        return adresseFacturation;
    }

    public void setAdresseFacturation(String adresseFacturation) {
        this.adresseFacturation = adresseFacturation;
    }

    public LocalDateTime getDatePaiement() {
        return datePaiement;
    }

    public void setDatePaiement(LocalDateTime datePaiement) {
        this.datePaiement = datePaiement;
    }
}

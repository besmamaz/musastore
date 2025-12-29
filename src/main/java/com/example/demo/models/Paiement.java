package com.example.demo.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "paiement")
public class Paiement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idpaiement;

    private double montant;

    @Column(name = "mode_paiement")
    private String modePaiement; // exemple: "carte", "paypal", "livraison"

    @Column(name = "adresse_facturation")
    private String adresseFacturation;

    private String statut; // ex: "en attente", "réussi", "échoué"

    @Column(name = "date_paiement")
    private LocalDateTime datePaiement = LocalDateTime.now();

    @OneToOne
    @JoinColumn(name = "idcommande", referencedColumnName = "idcommande")
    private Commande commande;

    // ✅ Constructeurs
    public Paiement() {}

    public Paiement(double montant, String modePaiement, String adresseFacturation, String statut, Commande commande) {
        this.montant = montant;
        this.modePaiement = modePaiement;
        this.adresseFacturation = adresseFacturation;
        this.statut = statut;
        this.commande = commande;
        this.datePaiement = LocalDateTime.now();
    }

    // ✅ Getters et Setters

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

    public String getAdresseFacturation() {
        return adresseFacturation;
    }

    public void setAdresseFacturation(String adresseFacturation) {
        this.adresseFacturation = adresseFacturation;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public LocalDateTime getDatePaiement() {
        return datePaiement;
    }

    public void setDatePaiement(LocalDateTime datePaiement) {
        this.datePaiement = datePaiement;
    }

    public Commande getCommande() {
        return commande;
    }

    public void setCommande(Commande commande) {
        this.commande = commande;
    }

    // ✅ Méthode utilitaire (optionnelle)
    @Override
    public String toString() {
        return "Paiement{" +
                "idpaiement=" + idpaiement +
                ", montant=" + montant +
                ", modePaiement='" + modePaiement + '\'' +
                ", adresseFacturation='" + adresseFacturation + '\'' +
                ", statut='" + statut + '\'' +
                ", datePaiement=" + datePaiement +
                ", commande=" + (commande != null ? commande.getIdcommande() : null) +
                '}';
    }
}

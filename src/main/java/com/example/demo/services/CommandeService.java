package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.Commande;
import com.example.demo.repositries.CommandeRepository;

@Service
public class CommandeService {

    @Autowired
    private CommandeRepository commandeRepository;

    // 🔹 Récupérer toutes les commandes
    public List<Commande> getAllCommandes() {
        return commandeRepository.findAll();
    }

    // 🔹 Récupérer une commande par ID
    public Optional<Commande> getCommandeById(Integer id) {
        return commandeRepository.findById(id);
    }

    // 🔹 Ajouter ou modifier une commande
    public Commande saveCommande(Commande commande) {
        return commandeRepository.save(commande);
    }

    // 🔹 Supprimer une commande
    public void deleteCommande(Integer id) {
        commandeRepository.deleteById(id);
    }
     //  méthode : mise à jour du statut
    public Commande updateStatus(Integer id, String newStatus) {
        Commande commande = commandeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Commande non trouvée"));
        commande.setStatus(newStatus);
        return commandeRepository.save(commande);
    }
}

package com.example.demo.services;

import org.springframework.stereotype.Service;

import com.example.demo.models.Panier;
import com.example.demo.repositries.PanierRepository;

@Service
public class PanierService {
    private final PanierRepository panierRepository;

    public PanierService(PanierRepository panierRepository) {
        this.panierRepository = panierRepository;
    }

    public Panier createPanier(Panier panier) {
        return panierRepository.save(panier);
    }

    public Panier getPanierById(int id) {
        return panierRepository.findById(id).orElse(null);
    }

    public void deletePanier(int id) {
        panierRepository.deleteById(id);
    }
}

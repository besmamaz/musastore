package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Paiement;
import com.example.demo.repositries.PaiementRepository;

@Service
public class PaimentService {
    private final PaiementRepository paimentRepository;

    public PaimentService(PaiementRepository paimentRepository) {
        this.paimentRepository = paimentRepository;
    }

    public Paiement savePaiement(Paiement paiment) {
        return paimentRepository.save(paiment);
    }

    public List<Paiement> getAllPaiements() {
        return paimentRepository.findAll();
    }

    public Paiement getPaiementById(int id) {
        return paimentRepository.findById(id).orElse(null);
    }

    public void deletePaiement(int id) {
        paimentRepository.deleteById(id);
    }
}

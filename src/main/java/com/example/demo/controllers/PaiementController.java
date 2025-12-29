package com.example.demo.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.models.Paiement;
import com.example.demo.repositries.PaiementRepository;
import java.util.List;

@RestController
@RequestMapping("/api/paiements")
@CrossOrigin(origins = "http://localhost:5173")
public class PaiementController {

    @Autowired
    private PaiementRepository paiementRepository;

    // ✅ Créer un paiement
    @PostMapping
    public Paiement createPaiement(@RequestBody Paiement paiement) {
        paiement.setStatut("en attente");

        Paiement saved = paiementRepository.save(paiement);
        // ⚙️ simulation de paiement réussi
        saved.setStatut("réussi");
        return paiementRepository.save(saved);
    }

    // ✅ Liste de tous les paiements
    @GetMapping
    public List<Paiement> getAllPaiements() {
        return paiementRepository.findAll();
    }

    // ✅ Récupérer un paiement spécifique
    @GetMapping("/{id}")
    public Paiement getPaiementById(@PathVariable int id) {
        return paiementRepository.findById(id).orElse(null);
    }
}


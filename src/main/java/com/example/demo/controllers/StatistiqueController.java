package com.example.demo.controllers;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.StatistiqueService;

@RestController
@RequestMapping("/api/statistiques")
@CrossOrigin(origins = "http://localhost:5173")
public class StatistiqueController {

    @Autowired
    private StatistiqueService statistiqueService;

    // ✅ Compter les commandes par statut
    @GetMapping("/commandes")
    public Map<String, Long> getCommandesByStatus() {
        return statistiqueService.getCommandesByStatus();
    }

    // ✅ Total revenus
    @GetMapping("/revenus")
    public double getTotalRevenus() {
        return statistiqueService.getTotalRevenus();
    }

    // ✅ Revenus par mois
    @GetMapping("/revenus-mensuels")
    public Map<String, Double> getRevenusMensuels() {
        return statistiqueService.getRevenusMensuels();
    }

    // ✅ Produits les plus vendus
    @GetMapping("/top-produits")
    public List<Map<String, Object>> getTopProduits() {
        return statistiqueService.getTopProduits();
    }

    // ✅ Clients les plus actifs
    @GetMapping("/top-clients")
    public List<Map<String, Object>> getTopClients() {
        return statistiqueService.getTopClients();
    }
    @GetMapping
public Map<String, Object> getAllStats() {
    Map<String, Object> allStats = new HashMap<>();
    allStats.put("commandesByStatus", statistiqueService.getCommandesByStatus());
    allStats.put("totalRevenus", statistiqueService.getTotalRevenus());
    allStats.put("revenusMensuels", statistiqueService.getRevenusMensuels());
    allStats.put("topProduits", statistiqueService.getTopProduits());
    allStats.put("topClients", statistiqueService.getTopClients());
    return allStats;
}

}

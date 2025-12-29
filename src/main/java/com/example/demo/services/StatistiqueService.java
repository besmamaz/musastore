package com.example.demo.services;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repositries.ArticleRepository;
import com.example.demo.repositries.CommandeRepository;
import com.example.demo.repositries.PaiementRepository;
import com.example.demo.repositries.PanierRepository;

@Service
public class StatistiqueService {

    @Autowired
    private CommandeRepository commandeRepository;

    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private PanierRepository panierRepository;

    @Autowired
    private ArticleRepository articleRepository;

    // ✅ Nombre de commandes par statut
    public Map<String, Long> getCommandesByStatus() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("pending", commandeRepository.countByStatus("pending"));
        stats.put("confirmed", commandeRepository.countByStatus("confirmed"));
        stats.put("shipped", commandeRepository.countByStatus("shipped"));
        stats.put("delivered", commandeRepository.countByStatus("delivered"));
        stats.put("cancelled", commandeRepository.countByStatus("cancelled"));
        return stats;
    }

    // ✅ Total revenus (paiements validés)
    public double getTotalRevenus() {
    Double total = paiementRepository.getTotalRevenusValides();
    return total != null ? total : 0.0;
}



    // ✅ Revenus mensuels (exemple simplifié)
    public Map<String, Double> getRevenusMensuels() {
    Map<String, Double> revenus = new LinkedHashMap<>();
    List<Object[]> results = paiementRepository.getRevenusParMois();

    String[] mois = {"Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                     "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"};

    // قيم ابتدائية صفرية
    for (String m : mois) {
        revenus.put(m, 0.0);
    }

    // نعمر القيم حسب النتائج من قاعدة البيانات
    for (Object[] row : results) {
        int monthIndex = ((Number) row[0]).intValue() - 1;
        double total = ((Number) row[1]).doubleValue();
        revenus.put(mois[monthIndex], total);
    }

    return revenus;
}


    // ✅ Produits les plus vendus (exemple fictif)
    public List<Map<String, Object>> getTopProduits() {
    List<Object[]> results = articleRepository.getTopProduits();
    List<Map<String, Object>> topProduits = new ArrayList<>();

    for (Object[] row : results) {
        Map<String, Object> produit = new HashMap<>();
        produit.put("name", row[0]);
        produit.put("quantite", row[1]);
        topProduits.add(produit);
    }

    return topProduits;
}


    // ✅ Clients les plus actifs (exemple fictif)
    public List<Map<String, Object>> getTopClients() {
    List<Object[]> results = commandeRepository.getTopClients();
    List<Map<String, Object>> topClients = new ArrayList<>();

    for (Object[] row : results) {
        Map<String, Object> client = new HashMap<>();
        client.put("name", row[0]);
        client.put("total", row[1]);
        topClients.add(client);
    }

    return topClients;
}

}


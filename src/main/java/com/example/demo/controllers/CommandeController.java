package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ArticleDTO;
import com.example.demo.DTO.ClientDTO;
import com.example.demo.DTO.CommandeDTO;
import com.example.demo.DTO.PaiementDTO;
import com.example.demo.models.Article;
import com.example.demo.models.Commande;
import com.example.demo.models.Panier;
import com.example.demo.services.CommandeService;

@RestController
@RequestMapping("/api/commandes")
@CrossOrigin(origins = "http://localhost:5173") // autoriser ton frontend React
public class CommandeController {

    @Autowired
    private CommandeService commandeService;

    // ✅ Liste de toutes les commandes
    @GetMapping
    public List<CommandeDTO> getAllCommandes() {
        return commandeService.getAllCommandes().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // ✅ Obtenir une commande spécifique
    @GetMapping("/{id}")
    public CommandeDTO getCommandeById(@PathVariable Integer id) {
        Optional<Commande> commande = commandeService.getCommandeById(id);
        return commande.map(this::convertToDTO).orElse(null);
    }

    // ✅ Convertir Commande → CommandeDTO
   private CommandeDTO convertToDTO(Commande commande) {
    CommandeDTO dto = new CommandeDTO();
    dto.setId(commande.getIdcommande());
    dto.setDate(commande.getDate());
    dto.setStatus(commande.getStatus());
    dto.setNumero("CMD-" + commande.getIdcommande());

    Panier panier = commande.getPanier();
    if (panier != null) {
        // 🎯 Montant total
        try {
            if (panier.getPrixtotale() != null && !panier.getPrixtotale().isEmpty()) {
                dto.setMontant(Double.parseDouble(panier.getPrixtotale()));
            } else {
                dto.setMontant(0.0);
            }
        } catch (NumberFormatException e) {
            dto.setMontant(0.0);
        }

        // 👤 Client
        if (panier.getClient() != null) {
            dto.setClientId(panier.getClient().getIdclient());
            dto.setClientNom(panier.getClient().getNom() + " " + panier.getClient().getPrenom());

            ClientDTO clientDTO = new ClientDTO();
            clientDTO.setIdclient(panier.getClient().getIdclient());
            clientDTO.setNom(panier.getClient().getNom());
            clientDTO.setPrenom(panier.getClient().getPrenom());
            clientDTO.setEmail(panier.getClient().getEmail());
            clientDTO.setPhone(panier.getClient().getPhone());
            clientDTO.setRole(panier.getClient().getRole());
            dto.setClient(clientDTO);
        }

        // 🛍️ Articles
        if (panier.getPanierArticles() != null && !panier.getPanierArticles().isEmpty()) {
            List<ArticleDTO> articleDTOs = panier.getPanierArticles().stream()
                    .map(pa -> {
                        Article article = pa.getArticle();
                        ArticleDTO articleDTO = new ArticleDTO();
                        if (article != null) {
                            articleDTO.setId(article.getIdarticle());
                            articleDTO.setName(article.getNamearticle());
                            articleDTO.setDescription(article.getDescription());
                            articleDTO.setPrice(article.getPrice());
                            articleDTO.setQuantite(pa.getQuantite());

                            // 🔒 Sécuriser les images
                            if (article.getImages() != null) {
                                articleDTO.setImages(
                                        article.getImages().stream()
                                                .map(img -> img.getImageurl())
                                                .collect(Collectors.toList())
                                );
                            }
                        }
                        return articleDTO;
                    })
                    .collect(Collectors.toList());

            dto.setArticles(articleDTOs);
        }
    }

    // 💳 Paiement
    if (commande.getPaiement() != null) {
        PaiementDTO paiementDTO = new PaiementDTO();
        paiementDTO.setIdpaiement(commande.getPaiement().getIdpaiement());
        paiementDTO.setMontant(commande.getPaiement().getMontant());
        paiementDTO.setModePaiement(commande.getPaiement().getModePaiement());
        paiementDTO.setStatut(commande.getPaiement().getStatut());
        paiementDTO.setAdresseFacturation(commande.getPaiement().getAdresseFacturation());
        paiementDTO.setDatePaiement(commande.getPaiement().getDatePaiement());
        dto.setPaiement(paiementDTO);
    }

    return dto;
}

    // ✅ Ajouter une commande
    @PostMapping
    public Commande addCommande(@RequestBody Commande commande) {
        return commandeService.saveCommande(commande);
    }

    // ✅ Modifier une commande
    @PutMapping("/{id}")
    public Commande updateCommande(@PathVariable Integer id, @RequestBody Commande updatedCommande) {
        updatedCommande.setIdcommande(id);
        return commandeService.saveCommande(updatedCommande);
    }
@PutMapping("/{id}/status")
public Commande updateCommandeStatus(@PathVariable Integer id, @RequestBody Map<String, String> request) {
    String newStatus = request.get("status");

    return commandeService.getCommandeById(id)
            .map(commande -> {
                String currentStatus = commande.getStatus();

                // 🚫 Bloquer les transitions illogiques
                if ("delivered".equals(currentStatus)) {
                    throw new RuntimeException("Order already delivered — status cannot be changed.");
                }

                if ("delivered".equals(newStatus) && !"shipped".equals(currentStatus)) {
                    throw new RuntimeException("Order must be shipped before being delivered.");
                }

                commande.setStatus(newStatus);
                return commandeService.saveCommande(commande);
            })
            .orElseThrow(() -> new RuntimeException("Order not found"));
}


    // ✅ Supprimer une commande
    @DeleteMapping("/{id}")
    public void deleteCommande(@PathVariable Integer id) {
        commandeService.deleteCommande(id);
    }
}

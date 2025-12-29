package com.example.demo.repositries;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Commande;  
@Repository
public interface CommandeRepository extends JpaRepository<Commande, Integer> {
    List<Commande> findByPanier_Idpanier(int idpanier);
    long countByStatus(String status); // commandes d'un panier
   @Query("""
    SELECT c.panier.client.nom, SUM(p.montant)
    FROM Paiement p
    JOIN p.commande c
    WHERE LOWER(p.statut) = 'validé'
    GROUP BY c.panier.client.nom
    ORDER BY SUM(p.montant) DESC
""")
List<Object[]> getTopClients();



}



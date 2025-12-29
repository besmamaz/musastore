package com.example.demo.repositries;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Paiement;  
@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Integer> {
    List<Paiement> findByCommande_Idcommande(int idcommande);
    @Query("SELECT SUM(p.montant) FROM Paiement p WHERE LOWER(p.statut) = 'validated'")
  Double getTotalRevenusValides();
 // paiements d'une commande
 @Query("SELECT MONTH(p.datePaiement) AS mois, SUM(p.montant) " +
       "FROM Paiement p WHERE LOWER(p.statut) = 'validated' " +
       "GROUP BY MONTH(p.datePaiement) ORDER BY mois")
List<Object[]> getRevenusParMois();

}

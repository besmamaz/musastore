package com.example.demo.repositries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Panier;  

@Repository
public interface PanierRepository extends JpaRepository<Panier, Integer> {
}

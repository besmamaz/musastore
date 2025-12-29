package com.example.demo.repositries;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
}

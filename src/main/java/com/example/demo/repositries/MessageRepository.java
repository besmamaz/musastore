package com.example.demo.repositries;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {}

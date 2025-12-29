package com.example.demo.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Images;

@Repository
public interface ImagesRepository extends JpaRepository<Images, Integer> {
    List<Images> findByArticle_Idarticle(int idarticle);
}

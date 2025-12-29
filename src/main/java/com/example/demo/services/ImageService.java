package com.example.demo.services;

import com.example.demo.models.Images;
import com.example.demo.repositries.ImagesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {
    private final ImagesRepository imagesRepository;

    public ImageService(ImagesRepository imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    public Images saveImage(Images image) {
        return imagesRepository.save(image);
    }

    public List<Images> getImagesByArticle(int idArticle) {
        return imagesRepository.findByArticle_Idarticle(idArticle);
    }

    public void deleteImage(int id) {
        imagesRepository.deleteById(id);
    }
}

package com.example.demo.DTO;

import org.springframework.web.multipart.MultipartFile;

public class AddArticleRequest {
    private String namearticle;
    private String description;
    private float price;

    // 🔹 maintenant on reçoit le nom de la catégorie au lieu de l'id
    private String categoryName;

    private MultipartFile[] images;

    // getters / setters
    public String getNamearticle() { return namearticle; }
    public void setNamearticle(String namearticle) { this.namearticle = namearticle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public float getPrice() { return price; }
    public void setPrice(float price) { this.price = price; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public MultipartFile[] getImages() { return images; }
    public void setImages(MultipartFile[] images) { this.images = images; }
}

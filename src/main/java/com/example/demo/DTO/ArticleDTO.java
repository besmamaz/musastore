package com.example.demo.DTO;
import java.util.List;
public class ArticleDTO {
    private int id;
    private String name;
    private String description;
    private double price;
    private List<String> images;
    private int quantite;

    // --- Getters & Setters ---
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double prix) { this.price = prix; }

    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public int getQuantite() { return quantite; }
    public void setQuantite(int quantite) { this.quantite = quantite; }
}

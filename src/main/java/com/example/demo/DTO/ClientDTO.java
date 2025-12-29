package com.example.demo.DTO;

public class ClientDTO {
    private long idclient;
    private String nom;
    private String prenom;
    private String email;
    private String phone;
    private String role;
    
    // Constructeur par défaut
    public ClientDTO() {}
    
    // Getters et setters
    public long getIdclient() {
        return idclient;
    }
    
    public void setIdclient(long idclient) {
        this.idclient = idclient;
    }
    
    public String getNom() {
        return nom;
    }
    
    public void setNom(String nom) {
        this.nom = nom;
    }
    
    public String getPrenom() {
        return prenom;
    }
    
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
}
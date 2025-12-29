import React, { useState } from "react";
import axios from "axios";

const ArticleModal = ({ show, formData, setFormData, onClose, modalType, onSave }) => {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null, null]);
  const [previewUrls, setPreviewUrls] = useState(["", "", "", ""]);

  if (!show) return null;

  // --- Gérer la sélection des fichiers ---
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...selectedFiles];
    const newPreviews = [...previewUrls];
    newFiles[index] = file;
    newPreviews[index] = URL.createObjectURL(file);

    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  // --- Sauvegarde (ajout ou modification) ---
  const handleSaveArticle = async () => {
    if (!formData.title || !formData.price || !formData.category) {
      alert("⚠️ Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const form = new FormData();
    form.append("namearticle", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("categoryName", formData.category);

    // Ajouter uniquement les fichiers sélectionnés
    selectedFiles.forEach((file) => {
      if (file) form.append("images", file);
    });

    try {
      let res;
      if (modalType === "add") {
        res = await axios.post("http://localhost:8080/api/articles", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else if (modalType === "edit") {
        res = await axios.put(`http://localhost:8080/api/articles/${formData.id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (res.status === 200 || res.status === 201) {
        alert(`✅ Article ${modalType === "add" ? "ajouté" : "modifié"} avec succès !`);
        setSelectedFiles([null, null, null, null]);
        setPreviewUrls(["", "", "", ""]);
        onClose();
        onSave && onSave(); // recharge la liste d'articles
      }
    } catch (err) {
      console.error("Erreur :", err);
      alert("❌ Une erreur est survenue lors de l’envoi.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>
          <i className={`fas fa-${modalType === "add" ? "plus" : "edit"}`}></i>{" "}
          {modalType === "add" ? "Ajouter un Article" : "Modifier l'Article"}
        </h2>

        {/* --- Champs du formulaire --- */}
        <div className="form-group">
          <label>Titre de l'article</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Prix (DA)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Catégorie</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>

        {/* --- Upload d’images --- */}
        <div className="form-group">
          <label>Images (4 max)</label>
          <div className="image-grid">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="upload-block">
                <label>Image {index + 1}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                />
                {previewUrls[index] && (
                  <img
                    src={previewUrls[index]}
                    alt={`preview-${index}`}
                    className="image-preview"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- Boutons --- */}
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            <i className="fas fa-times"></i> Annuler
          </button>
          <button className="btn btn-primary" onClick={handleSaveArticle}>
            <i className="fas fa-save"></i>{" "}
            {modalType === "add" ? "Ajouter" : "Sauvegarder"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;

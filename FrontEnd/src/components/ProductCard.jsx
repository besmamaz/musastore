import React from "react";

const ProductCard = ({ article, onEdit, onDelete }) => {
  return (
    <div className="article-card">
       <div className="article-image" style={{ width: "100%", height: "200px", overflow: "hidden" }}>
    {article.images && article.images.length > 0 ? (
      <img
        src={`http://localhost:8080${article.images[0]}`}
        
        alt={article.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.3s ease",
        
        }}
        // au survol, on affiche l'image complète
        onMouseEnter={(e) => (e.currentTarget.style.objectFit = "contain")}
        onMouseLeave={(e) => (e.currentTarget.style.objectFit = "cover")}
        
      />
    ) : (
      <i className="fas fa-image"></i>
    )}
  </div>

      <div className="article-title">{article.title}</div>

      <div className="article-price">
        {article.price !== undefined && article.price !== null
          ? article.price.toFixed(2)
          : "0.00"}{" "}
        DA
      </div>

      <div className="article-description">{article.description}</div>

      <div
        style={{ color: "#ff69b4", marginBottom: "15px", fontWeight: "600" }}
      >
        <i className="fas fa-tag"></i> {article.category}
      </div>

      <div className="article-actions">
        <button className="btn btn-warning" onClick={() => onEdit(article)}>
          <i className="fas fa-edit"></i> Modifier
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(article.id)}><i className="fas fa-trash"></i>Supprimer</button>

      
      </div>
    </div>
  );
};

export default ProductCard;

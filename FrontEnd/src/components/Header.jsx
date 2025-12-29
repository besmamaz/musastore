import React from "react";

const Header = ({ onAddArticle }) => {
  return (
    <div className="header">
      <h1>
        <i className="fas fa-box" style={{ marginRight: "15px" }}></i>
        Gestion des Articles
      </h1>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={onAddArticle}>
          <i className="fas fa-plus"></i>
          Ajouter un Article
        </button>
      </div>
    </div>
  );
};

export default Header;

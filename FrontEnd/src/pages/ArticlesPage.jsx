import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ArticleModal from "../components/ArticleModal";

const ArticlesPage = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/articles");
      let articlesArray = [];

      // Si res.data est un tableau direct
      if (Array.isArray(res.data)) {
        articlesArray = res.data;
      }
      // Si res.data est un objet avec 'content' (Spring Page)
      else if (res.data && Array.isArray(res.data.content)) {
        articlesArray = res.data.content;
      }

      // Mapping des articles pour React
      const mappedArticles = articlesArray.map((a) => ({
        id: a.idarticle,
        title: a.namearticle,
        price: a.price,
        description: a.description,
        category: a.categorie?.namecatalogue || "",
        images: Array.isArray(a.images) ? a.images.map((img) => img.imageurl) : [],
      }));

      console.log("Articles mappés :", mappedArticles); // ✅ pour vérifier
      setArticles(mappedArticles);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les articles");
    } finally {
      setLoading(false);
    }
  };

  fetchArticles();
}, []);


  const handleAddArticle = () => {
    setModalType("add");
    setFormData({ title: "", price: "", description: "", category: "" });
    setShowModal(true);
  };

  const handleEditArticle = (article) => {
    setModalType("edit");
    setSelectedArticle(article);
    setFormData(article);
    setShowModal(true);
  };

  const handleDeleteArticle = async (id) => {
  try {
    // Vérifiez dans la console l'ID que vous envoyez
    console.log("Tentative de suppression de l'article avec ID:", id);
    
    // Utilisez l'endpoint correct qui correspond à votre contrôleur
    const res = await axios.delete(`http://localhost:8080/api/articles/${id}`);
    if (res.status === 200) { 
      alert("Article supprimé !");
      // recharge la liste recherge 
      setArticles(articles.filter(article => article.id !== id));
    }
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression: " + err.message);
    
    // Optionnel : recharger tous les articles pour s'assurer que la liste est à jour
    const fetchArticles = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/articles");
        // Traitement des données comme dans votre useEffect
        const articlesArray = Array.isArray(res.data)
          ? res.data
          : res.data?.content || [];
        const mapped = articlesArray.map((a) => ({
          id: a.idarticle,
          title: a.namearticle,
          price: a.price,
          description: a.description,
          category: a.categorie?.namecatalogue || "",
          images: Array.isArray(a.images) ? a.images.map((img) => img.imageurl) : [],
        }));
        setArticles(mapped);
      } catch (fetchErr) {
        console.error(fetchErr);
      }
    };
    fetchArticles();
  }
};


  const handleSaveArticle = () => {
    if (modalType === "add") {
      const newArticle = { ...formData, id: Date.now(), price: parseFloat(formData.price), images: [] };
      setArticles([...articles, newArticle]);
    } else {
      setArticles(
        articles.map((a) =>
          a.id === selectedArticle.id ? { ...formData, id: a.id, price: parseFloat(formData.price) } : a
        )
      );
    }
    setShowModal(false);
  };

  return (
    <>
      <Header
        onAddArticle={handleAddArticle}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="header-actions" style={{ padding: 10 }}>
        <button
          className="btn btn-secondary"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{ display: window.innerWidth <= 768 ? "inline-flex" : "none" }}
        >
          Toggle Sidebar
        </button>
      </div>

      <div className={`articles-page ${sidebarCollapsed ? "collapsed" : ""}`}>
        {loading && <p style={{ padding: 20 }}>Chargement…</p>}
        {error && <p style={{ padding: 20, color: "red" }}>{error}</p>}

        <div className="articles-grid">
          {!loading && !error && Array.isArray(articles) &&
            articles.map((article) => (
              <ProductCard
                key={article.id}
                article={article}
                onEdit={handleEditArticle}
                onDelete={handleDeleteArticle} 
              />
            ))}
        </div>

        <ArticleModal
  show={showModal}
  formData={formData}
  setFormData={setFormData}
  onClose={() => setShowModal(false)}
  modalType={modalType}
  onSave={() => {
    // après POST, on recharge les articles
    (async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/articles");
        const articlesArray = Array.isArray(res.data)
          ? res.data
          : res.data?.content || [];
        const mapped = articlesArray.map((a) => ({
          id: a.idarticle,
          title: a.namearticle,
          price: a.price,
          description: a.description,
          category: a.categorie?.namecatalogue || "",
          images: Array.isArray(a.images) ? a.images.map((img) => img.imageurl) : [],
        }));
        setArticles(mapped);
      } catch (err) {
        console.error(err);
      }
    })();
  }}
/>

      </div>
    </>
  );
};

export default ArticlesPage;

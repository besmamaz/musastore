import React, { useState, useEffect } from "react";
import axios from "axios";


const CommandesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFormData, setOrderFormData] = useState({
    status: "",
    address: "",
    notes: "",
  });
  const [commandes, setCommandes] = useState([]);

  // ✅ Charger les commandes dynamiquement depuis le backend
  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/commandes");
        setCommandes(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };
    fetchCommandes();
  }, []);

  // 🔍 Filtrer les commandes selon le terme recherché
  const filteredOrders = commandes.filter(
    (order) =>
      order.numero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.statut?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔄 Changer le statut
  // ✅ Met à jour le statut dans le backend
const handleUpdateOrderStatus = async (id, newStatus) => {
  try {
    await axios.put(`http://localhost:8080/api/commandes/${id}/status`, {
      status: newStatus, // 👈 correspond au @RequestBody Map<String, String> backend
    });

    setCommandes((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      )
    );

    alert(`Statut updated "${newStatus}"`);
  } catch (err) {
    console.error(" errer when you update the status  :", err);
    alert(" errer when you update the status  !");
  }
};


  // 👁 Afficher les détails
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOrderFormData({
      status: order.statut,
      address: order.adresse,
      notes: "",
    });
    setShowOrderModal(true);
  };

  // 💾 Sauvegarde dans le backend
  const handleSaveOrder = async () => {
    if (!selectedOrder) return;
    try {
      await axios.put(
        `http://localhost:8080/api/commandes/${selectedOrder.id}`,
        {
          ...selectedOrder,
          statut: orderFormData.status,
          adresse: orderFormData.address,
        }
      );
      setCommandes((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, statut: orderFormData.status, adresse: orderFormData.address }
            : o
        )
      );
      setShowOrderModal(false);
      alert("Commande mise à jour !");
    } catch (err) {
      console.error("Erreur sauvegarde :", err);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>
          <i className="fas fa-shopping-cart"></i> Gestion des Commandes
        </h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher des commandes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="orders-grid">
        {filteredOrders.map((order) => (
  <div key={order.id} className="order-card">
    <div className="order-header">
    <div className="order-number">#{order.numero}</div>

    {/* ✅ Statut affiché visuellement */}
    <div className={`status-badge ${order.status}`}>
  {order.status === "pending" && "🕓 Pending"}
  {order.status === "confirmed" && "✅ Confirmed"}
  {order.status === "shipped" && "🚚 Shipped"}
  {order.status === "delivered" && "📦 Delivered"}
  {order.status === "cancelled" && "❌ Cancelled"}
</div>

  </div>

    <div className="order-client">
      <i className="fas fa-user"></i> {order.clientNom || "Client inconnu"}
    </div>

    <div className="order-amount">{order.montant?.toFixed(2)} €</div>

    <div className="order-date">
      <i className="fas fa-calendar"></i>{" "}
      {order.date ? new Date(order.date).toLocaleDateString("fr-FR") : "—"}
    </div>

    <div className="order-articles">
  <strong>Articles :</strong>
  <br />
  {order.articles && order.articles.length > 0 ? (
    order.articles.map((article, idx) => (
      <div key={idx} className="article-item" style={{ marginBottom: "10px" }}>
        <p><strong>{article.name}</strong> — {article.price.toFixed(2)} € x {article.quantite}</p>

        {/* 🖼️ Afficher les images de l’article */}
        {article.images && article.images.length > 0 && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {article.images.map((imgUrl, i) => (
              <img
  key={i}
  src={`http://localhost:8080${imgUrl}`}   // 👈 ajoute le domaine backend ici
  alt={article.name}
  style={{
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #ddd",
  }}
/>

            ))}
          </div>
        )}
      </div>
    ))
  ) : (
    <p>—</p>
  )}
</div>


   <div className="order-actions">
  <button className="btn btn-info" onClick={() => handleViewOrder(order)}>
    <i className="fas fa-eye"></i> Details
  </button>

  <button
    className="btn btn-success"
    onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
    disabled={["delivered", "cancelled"].includes(order.status)}
  >
    <i className="fas fa-truck"></i> shippe
  </button>

  <button
    className="btn btn-primary"
    onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
    disabled={["delivered", "cancelled"].includes(order.status)}
  >
    <i className="fas fa-check"></i> delivere
  </button>

  <button
    className="btn btn-danger"
    onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
    disabled={["delivered", "cancelled"].includes(order.status)}
  >
    <i className="fas fa-times"></i> cancele
  </button>
</div>

  </div>
))}

      </div>

      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-search"></i>
          <h3>there is no orders</h3>
          <p> try to update the research please .</p>
        </div>
      )}

     
      {showOrderModal && selectedOrder && (
  <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>
        <i className="fas fa-receipt"></i> orders details #{selectedOrder.numero}
      </h2>

      {/* 🧾 Infos générales */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        
      </div>

      {/* 💳 Paiement */}
      {selectedOrder.paiement ? (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            background: "#eef6ff",
            borderRadius: "8px",
          }}
        >
          <h3><i className="fas fa-credit-card"></i> Informations de paiement</h3>
          <p><strong>Mode :</strong> {selectedOrder.paiement.modePaiement}</p>
          <p><strong>Statut :</strong> {selectedOrder.paiement.statut}</p>
          <p><strong>Date :</strong> {new Date(selectedOrder.paiement.datePaiement).toLocaleString("fr-FR")}</p>
          <p><strong>Adresse de facturation :</strong> {selectedOrder.paiement.adresseFacturation}</p>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <em>Aucune information de paiement disponible.</em>
        </div>
      )}

      {/* 🛍️ Articles */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f3f3f3",
          borderRadius: "8px",
        }}
      >
        <h3><i className="fas fa-box"></i> Articles commandés</h3>
        {selectedOrder.articles && selectedOrder.articles.length > 0 ? (
          selectedOrder.articles.map((article, i) => (
            <div key={i} style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "8px" }}>
              <p>
                <strong>{article.name}</strong> — {article.price.toFixed(2)} € × {article.quantite}
              </p>
              {article.images && article.images.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {article.images.map((imgUrl, j) => (
                    <img
                      key={j}
                      src={`http://localhost:8080${imgUrl}`}
                      alt={article.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucun article trouvé.</p>
        )}
      </div>
      {/* 🧾 Infos générales */}
<div
  style={{
    marginBottom: "20px",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "8px",
  }}
>
  <p><strong>Client :</strong> {selectedOrder.clientNom || "Inconnu"}</p>
  <p><strong>Date :</strong> {new Date(selectedOrder.date).toLocaleDateString("fr-FR")}</p>
  <p><strong>Montant total :</strong> {selectedOrder.montant?.toFixed(2)} €</p>
  <p><strong>Statut :</strong> {selectedOrder.status}</p>
  <p><strong>Adresse de livraison :</strong> {selectedOrder.adresse || "—"}</p>
</div>

{/* 👤 Infos client */}
<div style={{ marginTop: "20px" }}>
  <h4><i className="fas fa-user"></i> Informations du client</h4>
  <p><strong>Nom :</strong> {selectedOrder.client?.nom} {selectedOrder.client?.prenom}</p>
  <p><strong>Email :</strong> {selectedOrder.client?.email}</p>
  <p><strong>Téléphone :</strong> {selectedOrder.client?.phone}</p>
</div>

{/* 💳 Infos paiement */}
{selectedOrder.paiement && (
  <div style={{ marginTop: "20px" }}>
    <h4><i className="fas fa-credit-card"></i> Informations de paiement</h4>
    <p><strong>Mode :</strong> {selectedOrder.paiement.modePaiement}</p>
    <p><strong>Statut :</strong> {selectedOrder.paiement.statut}</p>
    <p><strong>Adresse :</strong> {selectedOrder.paiement.adresseFacturation}</p>
    <p><strong>Date :</strong> {new Date(selectedOrder.paiement.datePaiement).toLocaleDateString("fr-FR")}</p>
  </div>
)}


      {/* ⚙️ Modification du statut */}
      

      

      <div className="modal-actions">
        <button
          className="btn btn-secondary"
          onClick={() => setShowOrderModal(false)}
        >
          <i className="fas fa-times"></i> close
        </button>
        
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CommandesPage;

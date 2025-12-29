import React, { useState, useEffect } from "react";
import axios from "axios";


const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ⬇️ Charger les clients depuis l’API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/clients");
        // adapter aux noms réels dans ta DB
        const mapped = res.data.map(c => ({
          id: c.idclient,
          nom: c.nom,            // ou c.nomclient selon ton entity
          prenom: c.prenom,
          email: c.email,
          telephone: c.phone,
          dateInscription: c.dateInscription || "2024-01-01", // si tu as ce champ
          totalCommandes: c.totalCommandes || 0,
          montantTotal: c.montantTotal || 0,
          ville: c.ville || ""
        }));
        setClients(mapped);
      } catch (err) {
        console.error("Erreur chargement clients :", err);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ville.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClient = async (id) => {
    if (window.confirm('Supprimer ce client ?')) {
      try {
        await axios.delete(`http://localhost:8080/api/clients/${id}`);
        setClients(clients.filter(client => client.id !== id));
      } catch (err) {
        console.error("Erreur suppression :", err);
      }
    }
  };

  const handleViewOrders = (client) => {
    alert(`Commandes du client ${client.nom}`);
  };

  return (
    <div className="clients-page">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher des clients…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="clients-grid">
        {filteredClients.map(client => (
          <div key={client.id} className="client-card">
            <div className="client-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="client-name">{client.nom}</div>
            <div className="client-email">{client.email}</div>

            <div className="client-info">
              <div className="client-info-item">
                <div className="client-info-label">Commandes</div>
                <div className="client-info-value">{client.totalCommandes}</div>
              </div>
              <div className="client-info-item">
                <div className="client-info-label">Total dépensé</div>
                <div className="client-info-value">{client.montantTotal.toFixed(2)} €</div>
              </div>
              <div className="client-info-item">
                <div className="client-info-label">Ville</div>
                <div className="client-info-value">{client.ville}</div>
              </div>
            </div>

            <div className="client-date">
              <i className="fas fa-calendar"></i> Inscrit le{" "}
              {new Date(client.dateInscription).toLocaleDateString('fr-FR')}
            </div>

            <div className="client-actions">
              <button
                className="btn btn-info"
                onClick={() => handleViewOrders(client)}
              >
                <i className="fas fa-eye"></i> Voir commandes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteClient(client.id)}
              >
                <i className="fas fa-trash"></i> Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-search"></i>
          <h3>Aucun client trouvé</h3>
          <p>Essayez de modifier votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;

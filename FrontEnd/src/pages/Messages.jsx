import React, { useEffect, useState } from "react";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");


  // Charger les messages
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/messages");
      if (!res.ok) throw new Error("Erreur lors du chargement des messages");
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur :", error);
      setLoading(false);
    }
  };

  // Supprimer un message
  const deleteMessage = async (id) => {
    if (window.confirm("Voulez-vous supprimer ce message ?")) {
      try {
        const res = await fetch(`http://localhost:8080/api/messages/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setMessages((prev) => prev.filter((m) => m.id !== id));
          alert("Message supprimé avec succès !");
          setSelectedMessage(null);
        } else {
          alert("Erreur lors de la suppression !");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Envoyer un email via le backend
  const sendEmail = async (to, subject, body) => {
  try {
    const res = await fetch("http://localhost:8080/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body }),
    });
    const data = await res.text();
    alert(data);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'envoi de l'email !");
  }
};


  // Marquer non lu
  const markAsUnread = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/messages/${id}/unread`, {
        method: "PUT",
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, repondu: false } : m))
        );
        setSelectedMessage(null);
        alert("Message marqué comme non lu !");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Formatage de date
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.sujet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.contenu?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !m.repondu) ||
      (filter === "read" && m.repondu);
    return matchesSearch && matchesFilter;
  });

  const totalMessages = messages.length;
  const readMessages = messages.filter((m) => m.repondu).length;
  const unreadMessages = totalMessages - readMessages;

  if (loading) {
    return (
      <div className="container-loading">
        <div className="spinner"></div>
        <p>Chargement des messages...</p>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>
          <i className="fas fa-envelope"></i> Centre de Messages
        </h1>
        <div className="unread-badge">
          <i className="fas fa-bell"></i> {unreadMessages} non lus
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div className="stat-value">{totalMessages}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-envelope-open"></i>
          </div>
          <div className="stat-value">{readMessages}</div>
          <div className="stat-label">Messages Lus</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-envelope-circle-check"></i>
          </div>
          <div className="stat-value">{unreadMessages}</div>
          <div className="stat-label">Non Lus</div>
        </div>
      </div>

      {/* Recherche */}
      <div className="search-section">
        <input
          type="text"
          className="search-bar"
          placeholder="Rechercher un message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste */}
      <div className="messages-container">
        <div className="messages-list">
          {filteredMessages.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <h3>Aucun message trouvé</h3>
            </div>
          ) : (
            filteredMessages.map((m) => (
              <div
                key={m.id}
                className={`message-item ${!m.repondu ? "unread" : ""}`}
                onClick={() => setSelectedMessage(m)}
              >
                <div className="message-header">
                  <div className="message-sender">
                    <i className="fas fa-user-circle"></i> {m.nom || "Visiteur"}
                  </div>
                  <span className="message-date">
                    <i className="fas fa-clock"></i> {formatDate(m.dateEnvoi)}
                  </span>
                </div>
                <div className="message-subject">
                  <i
                    className={`fas fa-${!m.repondu ? "envelope" : "envelope-open"}`}
                  ></i>{" "}
                  {m.sujet}
                </div>
                <div className="message-preview">
                  {m.contenu?.substring(0, 100)}...
                </div>
                <div className="message-email">
                  <i className="fas fa-at"></i> {m.email}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
     {selectedMessage && (
  <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>
        <i className="fas fa-envelope-open"></i> {selectedMessage.sujet}
      </h2>
      <div className="message-details">
        <p><strong>Nom :</strong> {selectedMessage.nom || "Visiteur"}</p>
        <p><strong>Email :</strong> {selectedMessage.email}</p>
        <p><strong>Date :</strong> {formatDate(selectedMessage.dateEnvoi)}</p>
      </div>
      <div className="message-body">{selectedMessage.contenu}</div>

      {/* Formulaire de réponse */}
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Écrire votre réponse ici..."
        rows={5}
        style={{ width: "100%", marginTop: "10px" }}
      />

      <div className="modal-actions" style={{ marginTop: "10px" }}>
        <button
          className="btn btn-success"
          onClick={() =>
            sendEmail(selectedMessage.email, "Re: " + selectedMessage.sujet, replyText)
          }
        >
          <i className="fas fa-reply"></i> Envoyer
        </button>

        <button
          className="btn btn-danger"
          onClick={() => deleteMessage(selectedMessage.id)}
        >
          <i className="fas fa-trash"></i> Supprimer
        </button>

        <button
          className="btn btn-primary"
          onClick={() => markAsUnread(selectedMessage.id)}
        >
          <i className="fas fa-envelope"></i> Marquer non lu
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => setSelectedMessage(null)}
        >
          <i className="fas fa-times"></i> Fermer
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MessagesPage;

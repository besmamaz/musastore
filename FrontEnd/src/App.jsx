// src/App.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ArticlesPage from "./pages/ArticlesPage";
import ClientsPage from "./pages/ClientPage";
import CommandesPage from "./pages/CommandesPage";
import StatistiquesPage from "./pages/StatistiquesPage";

// si tu as d’autres pages, importe-les aussi
import Messages from "./pages/Messages";


function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("articles"); // par défaut Articles
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);
  
  // Ajoutez cet effet pour charger les commandes
  useEffect(() => {
    // Fonction pour charger les commandes
    const fetchCommandes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/commandes');
        if (response.ok) {
          const data = await response.json();
          setCommandes(data);
          console.log("Commandes chargées:", data);
        } else {
          console.error('Erreur lors du chargement des commandes');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    };
    
    fetchCommandes();
  }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois au montage

  return (
    <div className="admin-container">
      {/* ----- Sidebar ----- */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* ----- Contenu principal ----- */}
      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        {activeSection === "articles" && (
          <ArticlesPage
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}

        {activeSection === "clients" && (
          <ClientsPage
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}

        {activeSection === "commandes" && (
          <CommandesPage
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        )}
       {activeSection === "statistiques" && (
          <StatistiquesPage 
             sidebarCollapsed={sidebarCollapsed}
             setSidebarCollapsed={setSidebarCollapsed} />
        )}
        {/* Exemples pour les autres menus */}
         
        {activeSection === "messages" && (<Messages 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}/>)}
        
        
      </div>
    </div>
  );
}

export default App;

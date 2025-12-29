import React from "react";

const Sidebar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  setActiveSection,
}) => {
  const navItems = [
    { id: "articles", label: "Articles", icon: "fas fa-box" },
    { id: "clients", label: "Clients", icon: "fas fa-users" },
    { id: "commandes", label: "Commandes", icon: "fas fa-shopping-cart" },
    { id: "statistiques", label: "Statistiques", icon: "fas fa-chart-bar" },
    { id: "messages", label: "Messages", icon: "fas fa-envelope" },
    { id: "logout", label: "Déconnexion", icon: "fas fa-sign-out-alt" },
  ];

  return (
    <>
      {/* Bouton toggle visible toujours, position fixe sur mobile */}
      <button
        className="toggle-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${
          mobileMenuOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-crown"></i>
            {!sidebarCollapsed && <span>musaa Store</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              <i className={item.icon}></i>
              <span className="nav-text">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

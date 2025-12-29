import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

const StatistiquesPage = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    commandesByStatus: {},
    topProduits: [],
    topClients: [],
  });
  const [loading, setLoading] = useState(true); // ⚠️ tu l'avais oublié
  const [chartPeriod, setChartPeriod] = useState("6months");

  // --- 🛰️ Récupération des données depuis le backend ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/statistiques");
        const data = await res.json();
        console.log("📊 Données reçues :", data);

        setStats({
          totalRevenue: data.totalRevenus || 0,
          commandesByStatus: data.commandesByStatus || {},
          topProduits: data.topProduits || [],
          topClients: data.topClients || [],
          revenueByMonth: data.revenusMensuels || {},
        });
        setLoading(false);
      } catch (error) {
        console.error("❌ Erreur lors du chargement :", error);
      }
    };

    fetchData();
  }, []);

  // --- 📈 Mise à jour des graphiques ---
  useEffect(() => {
    if (!loading && stats.totalRevenue !== undefined) renderCharts(stats);
  }, [loading, chartPeriod, stats]);

  const renderCharts = (data) => {
    // ✅ 1. Évolution du chiffre d’affaires
    const salesCtx = document.getElementById("salesChart");
    if (salesCtx) {
      const existing = Chart.getChart(salesCtx);
      if (existing) existing.destroy();

      const labels = Object.keys(data.revenueByMonth || {});
      const values = Object.values(data.revenueByMonth || {});

      new Chart(salesCtx, {
        type: "line",
        data: {
          labels: labels.length ? labels : ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
          datasets: [
            {
              label: "Chiffre d'affaires (€)",
              data: values.length ? values : [1000, 2000, 2500, 3000, 2800, 3500],
              borderColor: "#ff69b4",
              backgroundColor: "rgba(255, 105, 180, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    // ✅ 2. Statut des commandes
    const statusCtx = document.getElementById("statusChart");
    if (statusCtx) {
      const existing = Chart.getChart(statusCtx);
      if (existing) existing.destroy();

      const { delivered, shipped, pending, cancelled } = data.commandesByStatus || {};

      new Chart(statusCtx, {
        type: "doughnut",
        data: {
          labels: ["Livrée", "Expédiée", "En attente", "Annulée"],
          datasets: [
            {
              data: [
                delivered || 0,
                shipped || 0,
                pending || 0,
                cancelled || 0,
              ],
              backgroundColor: ["#32cd32", "#20b2aa", "#ffa500", "#ff6b9d"],
              borderWidth: 3,
              borderColor: "#fff",
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }
  };

  // --- 🌀 Loader ---
  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  // --- 🧾 Contenu principal ---
  return (
    <div className="containerdb">
      <h1 className="headerdb">📊 Tableau de Bord Statistiques</h1>

      {/* Cartes principales */}
      <div className="stats-grid">
        <div className="stat-card revenue">
          <div className="stat-value">
            {stats.totalRevenue?.toLocaleString("fr-FR")} €
          </div>
          <div className="stat-label">Chiffre d'Affaires Total</div>
        </div>

        <div className="stat-card orders">
          <div className="stat-value">
            {Object.values(stats.commandesByStatus).reduce(
              (sum, val) => sum + val,
              0
            )}
          </div>
          <div className="stat-label">Commandes Totales</div>
        </div>

        <div className="stat-card clients">
          <div className="stat-value">{stats.topClients.length}</div>
          <div className="stat-label">Clients Actifs</div>
        </div>

        <div className="stat-card articles">
          <div className="stat-value">{stats.topProduits.length}</div>
          <div className="stat-label">Produits Vendus</div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="charts-section">
        <div className="chart-container">
          <canvas id="salesChart"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="statusChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default StatistiquesPage;

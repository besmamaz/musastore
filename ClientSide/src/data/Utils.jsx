const Utils = {
    // Format price with Euro symbol
    formatPrice: (price) => {
        return `${price.toFixed(2)} €`;
    },

    // Format date to French locale
    formatDate: (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Get status label in French
    getStatusLabel: (status) => {
        const labels = {
            'en-attente': 'En attente',
            'expediee': 'Expédiée',
            'livree': 'Livrée',
            'annulee': 'Annulée'
        };
        return labels[status] || status;
    },

    // Calculate shipping cost
    calculateShipping: (subtotal) => {
        return subtotal > 100 ? 0 : 9.99;
    },

    // Scroll to top of page
    scrollToTop: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // Save to localStorage
    saveToLocalStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    // Load from localStorage
    loadFromLocalStorage: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return null;
        }
    }
};
import React from 'react'
// Cart Added Modal Component
const CartAddedModal = () => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-icon">
                    <i className="fas fa-check"></i>
                </div>
                <h2>Ajouté au panier!</h2>
                <p>Le produit a été ajouté à votre panier avec succès.</p>
            </div>
        </div>
    );
};

// Order Success Modal Component
const OrderSuccessModal = () => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-icon">
                    <i className="fas fa-check-circle"></i>
                </div>
                <h2>Commande validée!</h2>
                <p>Votre commande a été enregistrée avec succès. Vous recevrez une confirmation par email.</p>
                <div className="loading" style={{ marginTop: '20px' }}>
                    <div className="spinner"></div>
                    <p style={{ color: '#666', fontSize: '14px' }}>Redirection en cours...</p>
                </div>
            </div>
        </div>
    );
};

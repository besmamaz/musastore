import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CartPage({ cart, updateCartQuantity, getCartTotal }) {
  const nav = useNavigate()
  return (
    <div className="container">
      <div className="section-title"><h2>Panier</h2></div>
      <div className="cart-container">
        <div className="cart-items">
          {cart.length === 0 && <p>Votre panier est vide</p>}
          {cart.map((item, idx) => (
            <div key={idx} className="cart-item">
              <div className="cart-item-image"><i className="fas fa-image"></i></div>
              <div className="cart-item-details">
                <div className="cart-item-title">{item.title}</div>
                <div className="cart-item-meta">Qté: {item.quantity}</div>
                <div className="cart-item-price">{(item.price * item.quantity).toFixed(2)} €</div>
              </div>
              <div className="cart-item-actions">
                <button className="remove-btn" onClick={()=> updateCartQuantity(idx, 0)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Résumé</h3>
          <div className="summary-row"><span>Sous-total</span><span>{getCartTotal().toFixed(2)} €</span></div>
          <button className="btn btn-primary" onClick={()=>nav('/checkout')}>Passer la commande</button>
        </div>
      </div>
    </div>
  )
}

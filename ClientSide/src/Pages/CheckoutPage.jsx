import React, { useState } from 'react'

export default function CheckoutPage({ cart, clearCart }) {
  const [submitted, setSubmitted] = useState(false)
  const subtotal = cart.reduce((s,i)=> s + i.price * i.quantity, 0)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(()=> { clearCart(); setSubmitted(false); alert('Commande enregistrée !') }, 1000)
  }
  return (
    <div className="container">
      <div className="section-title"><h2>Checkout</h2></div>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section"><h3>Informations de livraison</h3>
            <div className="form-row">
              <input name="name" className="form-input" placeholder="Nom complet" required/>
              <input name="email" className="form-input" placeholder="Email" required/>
            </div>
            <button type="submit" className="btn btn-primary btn-large">Valider la commande</button>
          </div>
        </form>
        <div className="order-summary">
          <h3>Votre commande</h3>
          <div className="summary-row"><span>Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
        </div>
      </div>
      {submitted && <div className="modal-overlay"><div className="modal"><h2>Commande validée</h2></div></div>}
    </div>
  )
}

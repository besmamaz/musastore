import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetailPage({ products, addToCart }) {
  const { id } = useParams()
  const product = products.find(p => String(p.id) === String(id))
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState(product?.sizes?.[0] ?? null)
  const [color, setColor] = useState(product?.colors?.[0] ?? null)
  const nav = useNavigate()
  if (!product) return <div className="container"><p>Produit introuvable</p></div>

  const handleAdd = () => addToCart(product, qty, { size, color })

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={()=>nav('/shop')}>Retour</button>
      <div className="product-detail-container">
        <div className="product-detail-grid">
          <div className="product-gallery"><div className="main-image"><i className="fas fa-image"></i></div></div>
          <div className="product-info">
            <h1>{product.title}</h1>
            <div className="product-detail-price">{product.price.toFixed(2)} €</div>
            <p className="product-description">{product.description}</p>
            {product.sizes && <div className="option-group">{product.sizes.map(s => <button key={s} onClick={()=>setSize(s)} className={`size-option ${size===s?'active':''}`}>{s}</button>)}</div>}
            {product.colors && <div className="option-group">{product.colors.map(c=> <button key={c} onClick={()=>setColor(c)} className={`color-option ${color===c?'active':''}`}>{c}</button>)}</div>}
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={()=>setQty(q=>Math.max(1,q-1))}>-</button>
              <span className="quantity-value">{qty}</span>
              <button className="quantity-btn" onClick={()=>setQty(q=>q+1)}>+</button>
            </div>
            <div className="add-to-cart-section">
              <button className="btn btn-primary btn-large" onClick={handleAdd}>Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product, addToCart }) {
  const nav = useNavigate()
  return (
    <div className="product-card" onClick={() => nav(`/product/${product.id}`)}>
      <div className="product-image"><i className="fas fa-image"></i>{product.badge && <div className="product-badge">{product.badge}</div>}</div>
      <div className="product-content">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price">{product.price.toFixed(2)} €</div>
        <div className="product-actions" onClick={(e)=>e.stopPropagation()}>
          <button className="btn btn-small btn-add-cart" onClick={()=>addToCart(product)}>Ajouter</button>
        </div>
      </div>
    </div>
  )
}

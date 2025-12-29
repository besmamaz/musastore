import React from 'react'
import ProductCard from '../Components/ProductCard'

export default function HomePage({ products, addToCart }) {
  const featured = products.filter(p => p.badge).slice(0, 6)
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenue chez GirlyShop</h1>
          <p>Découvrez notre collection exclusive</p>
        </div>
      </section>

      <div className="container">
        <div className="section-title"><h2>Produits à la Une</h2></div>
        <div className="products-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
        </div>
      </div>
    </>
  )
}

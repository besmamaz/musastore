import React, { useState } from 'react'
import ProductCard from '../Components/ProductCard'

export default function ShopPage({ products, addToCart }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  let list = products
  if (category !== 'all') list = list.filter(p => p.category === category)
  if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase()))

  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="container">
      <div className="section-title"><h2>Boutique</h2></div>
      <div className="filter-section">
        <input className="search-input" placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="filter-select" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="all">Toutes</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="products-grid">
        {list.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart} />)}
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ cart, wishlist, navigate }) {
  const cartCount = cart.reduce((s, i) => s + (i.quantity || 0), 0)
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo"><i className="fas fa-crown"></i> GirlyShop</Link>
        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/shop">Boutique</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="nav-icons">
          <Link to="/account" className="icon-btn"><i className="fas fa-user"></i></Link>
          <Link to="/cart" className="icon-btn">
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}

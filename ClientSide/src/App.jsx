import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"; 
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import ShopPage from './Pages/ShopPage'
import ProductDetailPage from './Pages/ProductDetailPage'
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage'
import AccountPage from './Pages/AccountPage'
import ContactPage from './Pages/ContactPage'
import { PRODUCTS, CATEGORIES_DATA } from './data/Products';


export default function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('girlyshop_cart')
    if (saved) setCart(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('girlyshop_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1, options = {}) => {
    const idx = cart.findIndex(
      (i) => i.id === product.id && JSON.stringify(i.options) === JSON.stringify(options)
    )
    if (idx >= 0) {
      const copy = [...cart]
      copy[idx].quantity += quantity
      setCart(copy)
    } else {
      setCart([...cart, { ...product, quantity, options }])
    }
  }

  const updateCartQuantity = (index, qty) => {
    if (qty <= 0) {
      setCart((c) => c.filter((_, i) => i !== index))
      return
    }
    const copy = [...cart]
    copy[index].quantity = qty
    setCart(copy)
  }

  const clearCart = () => setCart([])

  const getCartTotal = () => cart.reduce((s, it) => s + it.price * it.quantity, 0)

  return (
    <>
      <Navbar cart={cart} wishlist={wishlist} navigate={navigate} />
      <Routes>
        <Route path="/" element={<HomePage products={PRODUCTS} addToCart={addToCart} />} />
        <Route
          path="/shop"
          element={<ShopPage products={PRODUCTS} addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetailPage addToCart={addToCart} products={PRODUCTS} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={(i) => updateCartQuantity(i, 0)}
              getCartTotal={getCartTotal}
              navigate={navigate}
            />
          }
        />
        <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}

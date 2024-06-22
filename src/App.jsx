import React, {useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Navigation } from "./components/navigation";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { Home } from "./components/home";
import ProductDetailPage from "./components/productDetail";
import CartPage from "./components/cart";

export const scroll = new SmoothScroll('a[href*="/#"]', {
  speed: 1000,
  speedAsDuration: true,
});
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem
      ));
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  console.log(cartItems)
  const cartItemCount = cartItems.reduce((total, item) => total + Number(item.quantity), 0);
  return (
    <Router>
      <div>
        <ScrollToTop />
        <Navigation cartItemCount={cartItemCount} />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/detail' element={<ProductDetailPage  addToCart={addToCart}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

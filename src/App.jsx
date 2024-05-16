import React from "react";
import { Navigation } from "./components/navigation";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from "./components/home";
import ProductDetailPage from "./components/productDetail";
import CartPage from "./components/cart";

export const scroll = new SmoothScroll('a[href*="/#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/detail' element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

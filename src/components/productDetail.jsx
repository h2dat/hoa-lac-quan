import React, { useState } from "react";
import JsonData from '../data/data.json';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const id = localStorage.getItem('productId');
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };


  const handleAddToCart = () => {

    const product = JsonData.Products.find(product => product.id === parseInt(id));
    console.log(product)
    if (product.status === 'comming_soon') {
      NotificationManager.error('Hết hàng!', 'Sản phẩm hiện đang hết hàng, rất xin lỗi vì sự bất tiện này')
    }
    else {
      console.log('wtf')
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      };
      const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingCartItem = existingCartItems.find(item => item.id === product.id);

      if (existingCartItem) {
        existingCartItem.quantity = parseInt(existingCartItem.quantity) + parseInt(quantity);
      } else {
        existingCartItems.push(cartItem);
      }

      localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
      NotificationManager.success('Đặt hàng Thành công!', 'Sản phẩm đã được thêm vào giỏ hàng');
    }
  };

  const product = JsonData.Products.find(product => product.id === parseInt(id));

  return (
    <div className="container py-5">
      
      <div>
      <NotificationContainer />
        <div className="row" style={{ marginTop: '5rem' }}>
          <div className="col-lg-6 product">
            <img src={`../${product.Image[index]}`} alt="Product" className="img-fluid" height={450} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            <div className="d-flex justify-content-center mt-2">
              {product.Image.map((image, idx) => (
                <img
                  key={idx}
                  src={`../${image}`}
                  alt={`Thumbnail ${idx}`}
                  className={`rounded-md cursor-pointer ${idx === index ? 'border border-primary' : ''}`}
                  onClick={() => setIndex(idx)}
                  style={{ width: 80, height: 80, marginRight: 20, marginTop: 20 }}
                />
              ))}
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold">{product.name}</h1>
            <h3 style={{ fontFamily: 'Arial', color: 'gray' }}>${product.price}</h3>
            <div className="product-detail-buttons row align-items-center mb-5" style={{ marginTop: '5rem' }}>
              <div className="rounded-pill">

                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  style={{ maxWidth: '70px', borderRadius: 20, padding: "10px", display: 'inline-block', margin: '0 5px', textAlign: 'center' }}
                />
                <button className="btn btn-outline-secondary" onClick={handleDecrement} style={{ padding: "10px", fontSize: '15px' }}>-</button>
                <button className="btn btn-outline-secondary" onClick={handleIncrement} style={{ marginLeft: "10px", padding: "10px", fontSize: '15px' }}>+</button>
              </div>
              <div className="col-md-4" style={{ marginTop: '10px' }}>
                <button type="button" className="btn btn-custom btn-lg" onClick={handleAddToCart} >
                  <i className="bi-cart-fill me-1" style={{ marginRight: '1rem' }}></i>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          {product.description.split('\n').map((line, index) => (
            <p className="lead" key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

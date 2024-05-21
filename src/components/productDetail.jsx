import React, { useState } from "react";
import JsonData from '../data/data.json';
import AlertDialog from "./AlertBox"

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const id = localStorage.getItem('productId');
  const [openAlert, setOpenAlert] = useState(false)
  const titleAlert = "Đặt hàng thành công"
  const messageAlert = "Sản phẩm đã được thêm vào giỏ hàng. Cảm ơn bạn đã đặt hàng!"
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
  const handleClose = () => {
    setOpenAlert(false);
  };
  const handleAddToCart = () => {
    const product = JsonData.Products.find(product => product.id === parseInt(id));
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity
    };
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingCartItem = existingCartItems.find(item => item.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      existingCartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    setOpenAlert(true)
  };
  const product = JsonData.Products.find(product => product.id === parseInt(id));

  return (
    <div className="container py-5">
      <AlertDialog open={openAlert} onClose={handleClose} title={titleAlert} message={messageAlert}/>

      <div>
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
            <div className="row align-items-center mb-5" style={{ marginTop: '5rem' }}>
              <div className="col-md-6 rounded-pill">
                <button className="btn btn-outline-secondary" onClick={handleIncrement} style={{ marginRight: "1rem", padding: "10px", fontSize: '20px' }}>+</button>
                <button className="btn btn-outline-secondary" onClick={handleDecrement} style={{ marginRight: "1rem", padding: "10px", fontSize: '20px' }}>-</button>
              </div>
              <div className="col-md-5 rounded-pill" style={{ marginLeft: '-20rem' }}>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  style={{ maxWidth: '10rem', borderRadius: 20, padding: "22px" }}
                />
              </div>
              <div className="col-md-4" style={{ marginLeft: '-10rem' }}>
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

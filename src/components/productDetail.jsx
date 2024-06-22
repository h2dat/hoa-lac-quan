import React, { useState, useEffect, useRef } from "react";
import JsonData from '../data/data.json';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ProductDetailPage = ({ addToCart }) => {
  const videoRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [index, setIndex] = useState(0);
  const [isVideo, setIsVideo] = useState(true);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const id = localStorage.getItem('productId');

  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideo]);

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

    if (product.status === 'comming_soon') {
      NotificationManager.error('Hết hàng!', 'Sản phẩm hiện đang hết hàng, rất xin lỗi vì sự bất tiện này');
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      };

      addToCart(cartItem);
      NotificationManager.success('Đặt hàng Thành công!', 'Sản phẩm đã được thêm vào giỏ hàng');
    }
  };

  const product = JsonData.Products.find(product => product.id === parseInt(id));

  const handleThumbnailClick = (idx) => {
    setIndex(idx);
    setIsVideo(false);
  };

  const handleVideoClick = () => {
    setIsVideo(true);
  };

  useEffect(() => {
    if (product && product.Video) {
      const video = document.createElement('video');
      video.src = `../${product.Video}`;

      video.addEventListener('loadeddata', () => {
        video.currentTime = 5; // Capture thumbnail at 5 seconds
      });

      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL('image/jpeg');
        setVideoThumbnail(imageUrl);
      });
    }
  }, [product]);

  return (
    <div className="container py-5">
      <div>
        <NotificationContainer />
        <div className="row" style={{ marginTop: '5rem' }}>
          <div className="col-lg-6 product">
            {isVideo && product.Video ? (
              <video controls ref={videoRef} muted height={450} style={{ width: '100%' }}>
                <source src={`../${product.Video}`} type="video/mp4" />
              </video>
            ) : (
              <img src={`../${product.Image[index]}`} alt="Product" className="img-fluid" height={450} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            )}
            <div className="d-flex justify-content-center mt-2">
              {videoThumbnail && (
                <img
                  src={videoThumbnail}
                  alt="Video Thumbnail"
                  className={`rounded-md cursor-pointer ${isVideo ? 'border border-primary' : ''}`}
                  onClick={handleVideoClick}
                  style={{ width: 80, height: 80, marginRight: 20, marginTop: 20 }}
                />
              )}
              {product.Image.map((image, idx) => (
                <img
                  key={idx}
                  src={`../${image}`}
                  alt={`Thumbnail ${idx}`}
                  className={`rounded-md cursor-pointer ${idx === index && !isVideo ? 'border border-primary' : ''}`}
                  onClick={() => handleThumbnailClick(idx)}
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
                <button type="button" className="btn btn-custom btn-lg" onClick={handleAddToCart}>
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

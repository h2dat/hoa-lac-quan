import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

export const Products = (props) => {
  const navigate = useNavigate();

  const handleItemClick = (e, product) => {
    e.preventDefault();

    localStorage.setItem('productId', product.id);
    navigate('/detail');

  };



  const [hoveredProductId, setHoveredProductId] = useState(null);

  return (
    <div id="products" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Products</h2>
          <p>
            Nốt Hương Đặc Sản – Nguyên Bản – Thủ Công
          </p>
        </div>
        <div className="row">
          <div className="products-items">
            {props.data ? props.data.map((item, i) => (
              <div key={item.id} className="col-sm-6 col-md-4 col-lg-4">
                <Link to={'/detail'} onClick={(e) => { handleItemClick(e, item) }}>
                  <div
                    className="products-item"
                    style={{
                      textAlign: "center",
                      margin: '0.5rem',
                      borderRadius: '10%',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={() => setHoveredProductId(item.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    <div style={{ width: "100%", height: "40rem", overflow: "hidden", position: 'relative' }}>
                      <img
                        src={item.Image[0]}
                        className="img-responsive"
                        alt={item.name}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          imageRendering: "optimizeQuality",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "translateZ(0)",
                          borderRadius: '10%'
                        }}
                      />
                      {hoveredProductId === item.id && item.status === 'comming_soon' && (
                        <div
                          className="hover-text"
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(255, 0, 0, 0.6)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '10px',
                            opacity: 1,
                            transition: 'opacity 0.3s ease, transform 0.3s ease-in-out',
                            transformOrigin: 'center',
                            zIndex: 1,
                            width: '100%',
                          }}
                        >
                          <h4 style={{ color: 'white' }}>Sold Out</h4>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )) : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

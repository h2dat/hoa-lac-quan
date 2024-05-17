import { Image } from "./image";
import { Link, useNavigate } from 'react-router-dom';

import React from "react";

export const Products = (props) => {
  const navigate = useNavigate();

  const handleItemClick = (e, product) => {
    e.preventDefault()
    if (product.status === 'comming_soon') {
      alert("Sản phẩm này hiện chưa phục vụ")
    }
    else {
      localStorage.setItem('productId', product.id)
      navigate('/detail');

    }
  };
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
            {props.data
              ? props.data.map((item, i) => (
                <div
                  key={item.id}
                  className="col-sm-6 col-md-4 col-lg-4"
                >
                  <Link to={'/detail'} onClick={(e) => { handleItemClick(e, item) }}>
                    <Image
                      title={item.name}
                      largeImage={item.Image[0]}
                    />
                  </Link>
                </div>
              ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

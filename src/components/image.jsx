import React from "react";

export const Image = ({ title, largeImage }) => {
  return (
   
      <div className="products-item" style={{ textAlign: "center", margin: '0.5rem' }}>
        <div className="hover-bg">
          <a href={largeImage} title={title} data-lightbox-Products="Products1">
            <div className="hover-text">
              <h4>{title}</h4>
            </div>
            <img
              src={largeImage}
              className="img-responsive"
              alt={title}
              style={{ display: "inline-block", width: "100%", height:"40rem" }}
            />
          </a>
        </div>
    </div>
  );
};

import React from "react";

export const Image = ({ title, largeImage }) => {
  return (
    <div className="products-item" style={{ textAlign: "center", margin: '0.5rem' }}>
      <div className="hover-bg" style={{ borderRadius: '10%', position: 'relative', overflow: 'hidden' }}>
        <a href={largeImage} title={title} data-lightbox-Products="Products1">
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          <div style={{ width: "100%", height: "40rem", overflow: "hidden" }}>
            <img
              src={largeImage}
              className="img-responsive"
              alt={title}
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
          </div>
        </a>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";

export const Features = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === props.data.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [props.data]);


  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Best Seller</h2>
          <h3>Đón Tết Nhâm Thìn ở Boston</h3>
        </div>
        <div className="row">
          {props.data ? (
            <div className="col-md-12">
              <div className="slider-container">
                <div className="slider">
                  {props.data.map((image, index) => (
                    <div
                      key={index}
                      className={`slide ${index === currentImageIndex ? "active" : ""}`}
                      style={{ backgroundImage: `url(${image.src})` }}
                    >
                      <img
                        className="feature-img"
                        src={image.src}
                        alt={image.title}
                      />
                    </div>
                  ))}
                </div>
                <div className="menu">
                  {props.data.map((_, index) => (
                    <label
                      key={index}
                      className={index === currentImageIndex ? "active" : ""}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
};

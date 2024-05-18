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

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? props.data.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === props.data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Best Seller</h2>
          <h3>Hộp quà tết</h3>
        </div>
        <div className="row">
          {props.data ? (
            <div className="col-md-12">
              <div className="feature-img-container">
                <img
                  className="feature-img slide"
                  src={props.data[currentImageIndex].src}
                  alt={props.data[currentImageIndex].title}
                />
                <div className="button-container">
                  <button onClick={goToPreviousImage}>
                    <i className="fa fa-arrow-left"></i>
                  </button>
                  <button onClick={goToNextImage}>
                    <i className="fa fa-arrow-right"></i>
                  </button>
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

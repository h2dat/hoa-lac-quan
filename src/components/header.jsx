import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
          <div className="container">
            
              <div className="col-md-8 col-md-offset-2 intro-text">
                <a
                  href="#products"
                  className="btn btn-custom btn-lg page-scroll"
                  style={{ marginTop: "100px"}}
                >
                  Order now
                </a>
              </div>
            
          </div>
        </div>
    </header>
  );
};

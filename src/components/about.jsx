import React from "react";

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title" style={{ textAlign: 'center' }}>
          <h2>Những điều khác biệt</h2>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <div className="about-text">
              <h3>CÂU CHUYỆN THƯƠNG HIỆU</h3>
              <p>{props.data ? props.data.paragraph1 : "loading..."}</p>

            </div>
          </div>
          <div className="col-xs-12 col-md-4">
            {" "}
            <img src="img/intro-2.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-4">
            <div className="about-text">
              <h3>NGUYÊN LIỆU ĐẶC SẢN</h3>
              <p>{props.data ? props.data.paragraph2 : "loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

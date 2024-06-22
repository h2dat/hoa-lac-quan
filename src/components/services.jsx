import React from "react";
import { Image } from "./image";

export const Services = (props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Luôn đặt sự hài lòng của khách hàng lên hàng đầu</p>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6">
                <Image title={d.name} largeImage={d.img} />
                <div className="service-desc">
                  <h3>{d.name}</h3>
                </div>
              </div>
            ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};

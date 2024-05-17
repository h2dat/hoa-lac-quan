import React from "react";
import { Link } from 'react-router-dom';

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/#page-top">
            <img src="../img/1-04.jpg" alt="logo" style={{maxHeight: "60px", width:'auto',  transform: 'translate(200px, -20px)', borderRadius:'10px'}} />
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="/#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="/#products" className="page-scroll">
                Products
              </a>
            </li>
            <li>
              <a href="/#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li>
            <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

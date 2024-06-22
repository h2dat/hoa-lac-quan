import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export const Navigation = ({ cartItemCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 500);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className={`navbar-toggle ${isOpen ? '' : 'collapsed'}`}
            onClick={handleToggle}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand page-scroll" href="/#page-top">
            <img src="../img/1-04.jpg" alt="logo" />
          </a>
        </div>

        <div
          className={`collapse navbar-collapse ${isOpen ? 'in' : 'collapsed'}`}
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/#features" className="page-scroll" onClick={() => setIsOpen(false)}>
                Best seller
              </a>
            </li>
            <li>
              <a href="/#about" className="page-scroll" onClick={() => setIsOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="/#products" className="page-scroll" onClick={() => setIsOpen(false)}>
                Products
              </a>
            </li>
            <li>
              <a href="/#contact" className="page-scroll" onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              {!isMobile && (
                <IconButton component={Link} to="/cart" onClick={() => setIsOpen(false)}>
                  <Badge badgeContent={cartItemCount} color="primary">
                    <ShoppingCartIcon style={{ fontSize: 30 }} />
                  </Badge>
                </IconButton>
              )}
            </li>
          </ul>
        </div>
        {isMobile && (
          <IconButton
            component={Link}
            to="/cart"
            className="icon-button"
            style={{ transform: 'translate(400%, -5%)', zIndex: 1000 }}
          >
            <Badge badgeContent={cartItemCount} color="primary">
              <ShoppingCartIcon style={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
        )}
      </div>
    </nav>
  );
};

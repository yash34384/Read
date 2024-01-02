/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../../Styles/PublicUI/Header.scss';
import logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  return (
    <header className="header">
      <section className="header-logo">
        <img src={logo} alt="Brand-Logo" />
      </section>
      <section className="main-header-options">
        <section className="header-option">
          <Link to={'/'}>Home</Link>
          <Link to={'/shelf'}>Shelf</Link>
          <Link to={'/about'}>About Us</Link>
        </section>
        <section className="header-profile">
          <Link to={'/'}>
            <i class="fa-solid fa-house house"></i>
          </Link>
          <Link to={'/shelf'}>
            <i class="fa-solid fa-layer-group group"></i>
          </Link>
          <Link to={'/about'}>
            <i class="fa-solid fa-note-sticky sticky"></i>
          </Link>
          <Link to={'/search'}>
            <i class="fa-solid fa-magnifying-glass search"></i>
          </Link>
          <Link to={'/cart'}>
            <i class="fa-solid fa-cart-shopping cart"></i>
          </Link>
          {isAuthenticated ? (
            <Link to={'/account'}>
              <i class="fa-solid fa-user profile"></i>
            </Link>
          ) : (
            <Link to={'/login'}>
              <i class="fa-solid fa-user profile"></i>
            </Link>
          )}
        </section>
      </section>
    </header>
  );
};

export default Header;

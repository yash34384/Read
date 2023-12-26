/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react';
import '../../Styles/PublicUI/Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-boxes">
        <div className="box">
          <p className="head">Other info</p>
          <a href="#" className="foot-options">
            Terms & Conditions
          </a>
          <a href="#" className="foot-options">
            Policy
          </a>
          <a href="#" className="foot-options">
            License
          </a>
        </div>
        <div className="box">
          <p className="head">Media</p>
          <a href="#" className="foot-options">
            Blogs
          </a>
          <a href="#" className="foot-options">
            Photo Gallery
          </a>
          <a href="#" className="foot-options">
            Latest News
          </a>
        </div>
        <div className="box">
          <p className="head">Company</p>
          <a href="#" className="foot-options">
            About Us
          </a>
          <a href="#" className="foot-options">
            Career
          </a>
          <a href="#" className="foot-options">
            Services
          </a>
        </div>
        <div className="box">
          <p className="head">Be Social</p>
          <a href="#" className="foot-options">
            <i class="fa-brands fa-square-instagram social"></i>
            {'  '}Instagram
          </a>
          <a href="#" className="foot-options">
            <i class="fa-solid fa-up-right-from-square social"></i>
            {'  '}Website
          </a>
          <a href="#" className="foot-options">
            <i class="fa-brands fa-linkedin social"></i>
            {'  '}LinkedIn
          </a>
        </div>
      </div>
      <div className="copyright">
        CopyRight 2023 by Read (All Right Reserved)
      </div>
    </div>
  );
};

export default Footer;

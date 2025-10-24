
import React from 'react';
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import '../styles/Copywright.css'
const Copywright = () => {
  return (
    <footer className="footer relative z-10">
      <div className="footer-container">
        <div className="footer-section footer-about">
          <h1 className="footer-title">FrameStack</h1>
          <p className="footer-description">
            FrameStack is a global UI/UX design agency that boosts brand value with user-friendly, effective designs for web, mobile, and SaaS platforms.
          </p>
          <div className="footer-social-icons">
            <a href="#" className="footer-social-link">
              <FaInstagram className="footer-icon" />
            </a>
            <a href="#" className="footer-social-link">
              <FaLinkedin className="footer-icon" />
            </a>
            <a href="#" className="footer-social-link">
              <FaGithub className="footer-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section footer-services">
          <h1 className="footer-title">Services</h1>
          <ul className="footer-services-list">
            <li><a href="#" className="footer-service-link">Web Development</a></li>
            <li><a href="#" className="footer-service-link">E-Commerce</a></li>
            <li><a href="#" className="footer-service-link">UI/UX Design</a></li>
          </ul>
        </div>

        <div className="footer-section footer-subscribe">
          <h1 className="footer-title">Stay Updated</h1>
          <p className="footer-sub-text">Subscribe to get the latest updates and tips.</p>
          <form className="footer-sub-form">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="footer-email-input" 
              required 
            />
            <button type="submit" className="footer-sub-button">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} FrameStack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Copywright;
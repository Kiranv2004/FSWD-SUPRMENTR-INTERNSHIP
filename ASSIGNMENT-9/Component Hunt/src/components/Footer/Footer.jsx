import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#careers">Careers</a></li>
            <li><a href="#press">Press</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Resources</h4>
          <ul className="footer-links">
            <li><a href="#help">Help Center</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <ul className="footer-links">
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#cookies">Cookie Policy</a></li>
            <li><a href="#guidelines">Community Guidelines</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="social-links">
            <a href="#facebook" className="social-link" title="Facebook">
              <FaFacebook />
            </a>
            <a href="#twitter" className="social-link" title="Twitter">
              <FaTwitter />
            </a>
            <a href="#instagram" className="social-link" title="Instagram">
              <FaInstagram />
            </a>
            <a href="#linkedin" className="social-link" title="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-info">
          <p className="logo-footer">
            <span className="logo-icon-footer">▶</span>
            <span className="logo-text-footer">VideoHub</span>
          </p>
          <p className="copyright">
            © 2024 VideoHub. All rights reserved. | Made with ❤️ using React | Copyright belong to KIRAN V
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

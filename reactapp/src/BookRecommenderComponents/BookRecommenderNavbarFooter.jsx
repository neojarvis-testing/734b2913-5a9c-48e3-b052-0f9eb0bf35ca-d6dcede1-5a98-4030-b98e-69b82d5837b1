import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookRecommenderNavbar.css';

const Footer = () => {
  return (
    <footer className="footer glass-footer">
      <div className="footer-content text-center">
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:example@example.com">example@example.com</a></p>
        <p>Phone: <a href="tel:123-456-7890">123-456-7890</a></p>
      </div>
    </footer>
  );
};

export default Footer;
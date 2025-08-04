import React from 'react';
import '../static/styles/footer.css'; // If you have custom styles
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">Jennyyyy</div>
        </div>

        <div className="footer-text">
          <p className="footer-made">Made with ♡ and boba</p>
          <p className="footer-copy">© 2025 Jenny C</p>
        </div>

        <div className="footer-right">
          <a
            href="https://www.linkedin.com/in/an-chieh-cheng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/Jennyyyy0212"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="mailto:jennyc28@uci.edu"
            aria-label="Email"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

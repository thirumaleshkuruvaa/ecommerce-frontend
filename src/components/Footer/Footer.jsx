import { Link } from "react-router-dom";
import "../../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container py-5">
        <div className="row g-4">
          {/* Get to Know Us */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Get to Know Us</h5>
            <ul className="footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/press">Press Releases</Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Help</h5>
            <ul className="footer-links">
              <li>
                <Link to="/account/orders">Your Orders</Link>
              </li>
              <li>
                <Link to="/returns">Returns Centre</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping Info</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Seller */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Make Money With Us</h5>
            <ul className="footer-links">
              <li>
                <Link to="/become-seller">Become a Seller</Link>
              </li>
              <li>
                <Link to="/seller">Seller Dashboard</Link>
              </li>
              <li>
                <Link to="/advertise">Advertise Products</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title">Connect With Us</h5>

            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>

            <div className="mt-4 footer-contact">
              <p className="mb-2">
                <i className="bi bi-envelope-fill me-2"></i>
                support@glomo.com
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone-fill me-2"></i>
                +91 9505700451
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div>© 2026 Glomo. All Rights Reserved.</div>
          <div>🇮🇳 India | English</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { FaStore, FaTruck, FaWallet, FaChartLine } from "react-icons/fa";

const SellerAuthLayout = ({ children, isLogin }) => {
  return (
    <section className="seller-auth-page">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* LEFT CONTENT */}
          <div className="col-lg-5">
            <div className="seller-left-panel">
              <div className="seller-badge">
                <FaStore className="me-2" />
                GLOMO Seller Hub
              </div>

              <h1>
                Sell smarter with <span>GLOMO</span>
              </h1>

              <p>
                Create your seller account, manage products, track orders,
                receive payments and grow your online business with a clean
                seller dashboard.
              </p>

              <div className="seller-feature-list">
                <div className="seller-feature-item">
                  <FaTruck />
                  <div>
                    <h6>Fast Order Processing</h6>
                    <p>Manage shipping and pickup details smoothly.</p>
                  </div>
                </div>

                <div className="seller-feature-item">
                  <FaWallet />
                  <div>
                    <h6>Secure Settlements</h6>
                    <p>Bank details and seller payouts in one place.</p>
                  </div>
                </div>

                <div className="seller-feature-item">
                  <FaChartLine />
                  <div>
                    <h6>Business Growth</h6>
                    <p>Track orders, reports and product performance.</p>
                  </div>
                </div>
              </div>

              <div className="seller-auth-illustration">
                <img
                  src={
                    isLogin
                      ? "/images/glomo-seller-login.png"
                      : "/images/glomo-seller-register.png"
                  }
                  alt="GLOMO Seller"
                />
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-7">
            <div className="seller-right-panel">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerAuthLayout;

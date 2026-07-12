import { FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

//import "../../css/BecomeSeller.css";
import customTheme from "../../theme/customTheme";

const BecomeSeller = () => {
  const navigate = useNavigate();

  return (
    <div className="seller-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-lg-6 mb-4">
            <h1 className="fw-bold">
              Sell Your Products
              <span
                style={{
                  color: customTheme.palette.primary.main,
                }}
              >
                {" "}
                with Trend Cart
              </span>
            </h1>

            <p className="lead mt-3">
              Start your online business and reach thousands of customers across
              India.
            </p>

            <div className="mt-4">
              <button
                className="btn btn-lg text-white"
                style={{
                  backgroundColor: customTheme.palette.primary.main,
                }}
                onClick={() => navigate("/seller")}
              >
                <FaStore className="me-2" />
                Start Selling
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 text-center">
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
              alt="seller"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;

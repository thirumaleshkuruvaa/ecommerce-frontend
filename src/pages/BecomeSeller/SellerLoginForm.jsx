import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";
import {
  sendSellerLoginOtp,
  sellerLogin,
  fetchSellerProfile,
} from "../../redux/seller/sellerThunk";
import OtpInput from "./OtpInput";

const SellerLoginForm = ({ onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((store) => store.seller);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [localErrors, setLocalErrors] = useState({
    email: "",
    otp: "",
  });

  const validateEmail = () => {
    let errors = {};

    if (!email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Enter valid email address";
    }

    setLocalErrors((prev) => ({
      ...prev,
      email: errors.email || "",
    }));

    return Object.keys(errors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateEmail()) return;

    try {
      await dispatch(sendSellerLoginOtp(email)).unwrap();
      setOtpSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!otp.trim()) {
      errors.otp = "Please enter OTP";
    } else if (otp.length !== 6) {
      errors.otp = "OTP must be 6 digits";
    }

    setLocalErrors((prev) => ({
      ...prev,
      otp: errors.otp || "",
    }));

    if (Object.keys(errors).length > 0) return;

    try {
      await dispatch(sellerLogin({ email, otp })).unwrap();
      await dispatch(fetchSellerProfile()).unwrap();

      // here you can navigate to seller dashboard if you want
      // navigate("/seller/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="seller-form-card">
      <div className="seller-form-top">
        <h3>Seller Login</h3>
        <p>Login with OTP to manage products, orders and reports</p>
      </div>

      {success && <div className="alert alert-success mt-3">{success}</div>}
      {error && (
        <div className="alert alert-danger mt-3">
          {typeof error === "string" ? error : "Something went wrong"}
        </div>
      )}

      <form onSubmit={handleVerifyOtp} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Seller Email</label>
          <div className="seller-input-group">
            <FaEnvelope />
            <input
              type="email"
              className={`form-control ${localErrors.email ? "is-invalid" : ""}`}
              placeholder="Enter seller email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLocalErrors((prev) => ({ ...prev, email: "" }));
              }}
            />
          </div>
          {localErrors.email && (
            <div className="invalid-feedback d-block">{localErrors.email}</div>
          )}
        </div>

        {!otpSent ? (
          <button
            type="button"
            className="btn seller-btn-primary w-100"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            <div className="mb-3 mt-4">
              <label className="form-label">Enter OTP</label>
              <OtpInput
                otp={otp}
                setOtp={(value) => {
                  setOtp(value);
                  setLocalErrors((prev) => ({ ...prev, otp: "" }));
                }}
                error={localErrors.otp}
              />
            </div>

            <button
              type="submit"
              className="btn seller-btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Login"}
              {!loading && <FaArrowRight className="ms-2" />}
            </button>
          </>
        )}
      </form>

      <div className="seller-login-bottom text-center mt-4">
        <p className="mb-1">New seller on GLOMO?</p>
        <button
          type="button"
          className="seller-link-btn"
          onClick={onSwitchToRegister}
        >
          Create Seller Account
        </button>
      </div>
    </div>
  );
};

export default SellerLoginForm;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";

import {
  sendLoginOtp,
  login,
  fetchUserProfile,
} from "../../redux/Auth/authThunk";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector((store) => store.auth);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async () => {
    try {
      await dispatch(
        sendLoginOtp({
          email,
          role: "ROLE_CUSTOMER",
        }),
      ).unwrap();

      setOtpSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        login({
          email,
          otp,
        }),
      ).unwrap();

      await dispatch(fetchUserProfile()).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <div className="auth-form-header auth-amazon-header">
        <h2>Sign in</h2>
      </div>

      {successMessage && (
        <div className="alert alert-success auth-alert">{successMessage}</div>
      )}

      {error && (
        <div className="alert alert-danger auth-alert">
          {error.error || error.message || "Something went wrong"}
        </div>
      )}

      {/* EMAIL */}
      <div className="auth-field">
        <label className="auth-label">Email address</label>
        <input
          type="email"
          className="auth-amazon-input"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {!otpSent ? (
        <button
          type="button"
          className="auth-amazon-btn"
          onClick={handleSendOtp}
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Continue"}
        </button>
      ) : (
        <>
          <div className="auth-field otp-field-wrap">
            <label className="auth-label">Enter OTP</label>
            <OtpInput otp={otp} setOtp={setOtp} />
          </div>

          <button type="submit" className="auth-amazon-btn" disabled={loading}>
            {loading ? "Verifying..." : "Login"}
          </button>
        </>
      )}

      <p className="auth-terms-text">
        By continuing, you agree to Glomo's Conditions of Use and Privacy
        Notice.
      </p>
    </form>
  );
};

export default LoginForm;

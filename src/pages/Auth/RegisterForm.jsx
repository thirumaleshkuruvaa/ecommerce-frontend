// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import OtpInput from "./OtpInput";

// import {
//   sendSignupOtp,
//   signup,
//   fetchUserProfile,
// } from "../../redux/Auth/authThunk";

// const RegisterForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error, successMessage } = useSelector((store) => store.auth);

//   const [otpSent, setOtpSent] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     otp: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSendOtp = async () => {
//     try {
//       await dispatch(sendSignupOtp(formData.email)).unwrap();

//       setOtpSent(true);

//       console.log("SIGNUP OTP SENT");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       await dispatch(signup(formData)).unwrap();

//       await dispatch(fetchUserProfile()).unwrap();
//       console.log("REGISTRATION SUCCESS");

//       navigate("/");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister} className="auth-form">
//       <div className="auth-form-header">
//         <h2>Create Account</h2>
//         <p>Sign up to enjoy a better shopping experience</p>
//       </div>

//       {successMessage && (
//         <div className="alert alert-success auth-alert">
//           <i className="bi bi-check-circle-fill me-2"></i>
//           {successMessage}
//         </div>
//       )}

//       {error && (
//         <div className="alert alert-danger auth-alert">
//           <i className="bi bi-exclamation-circle-fill me-2"></i>
//           {typeof error === "string" ? error : "Registration Failed"}
//         </div>
//       )}

//       <div className="auth-field">
//         <label className="auth-label">Full Name</label>
//         <div className="auth-input-group">
//           <span className="auth-input-icon">
//             <i className="bi bi-person"></i>
//           </span>
//           <input
//             type="text"
//             className="auth-input"
//             name="fullName"
//             placeholder="Enter your full name"
//             value={formData.fullName}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="auth-field">
//         <label className="auth-label">Email Address</label>
//         <div className="auth-input-group">
//           <span className="auth-input-icon">
//             <i className="bi bi-envelope"></i>
//           </span>
//           <input
//             type="email"
//             className="auth-input"
//             name="email"
//             placeholder="Enter your email address"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="auth-field">
//         <label className="auth-label">Phone Number</label>
//         <div className="auth-input-group">
//           <span className="auth-input-icon">
//             <i className="bi bi-telephone"></i>
//           </span>
//           <input
//             type="text"
//             className="auth-input"
//             name="phoneNumber"
//             placeholder="Enter your phone number"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="auth-field">
//         <label className="auth-label">Password</label>
//         <div className="auth-input-group">
//           <span className="auth-input-icon">
//             <i className="bi bi-lock"></i>
//           </span>
//           <input
//             type="password"
//             className="auth-input"
//             name="password"
//             placeholder="Create a password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       {!otpSent ? (
//         <button
//           type="button"
//           className="auth-primary-btn"
//           onClick={handleSendOtp}
//           disabled={loading}
//         >
//           {loading ? (
//             <>
//               <span className="spinner-border spinner-border-sm me-2"></span>
//               Sending OTP...
//             </>
//           ) : (
//             <>
//               <i className="bi bi-send me-2"></i>
//               Send OTP
//             </>
//           )}
//         </button>
//       ) : (
//         <>
//           <div className="auth-field otp-field-wrap">
//             <label className="auth-label">Enter OTP</label>

//             <OtpInput
//               otp={formData.otp}
//               setOtp={(value) =>
//                 setFormData({
//                   ...formData,
//                   otp: value,
//                 })
//               }
//             />
//           </div>

//           <button
//             type="submit"
//             className="auth-primary-btn auth-success-btn"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2"></span>
//                 Creating Account...
//               </>
//             ) : (
//               <>
//                 <i className="bi bi-check-circle me-2"></i>
//                 Create Account
//               </>
//             )}
//           </button>
//         </>
//       )}
//     </form>
//   );
// };

// export default RegisterForm;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";

import {
  sendSignupOtp,
  signup,
  fetchUserProfile,
} from "../../redux/Auth/authThunk";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector((store) => store.auth);

  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = async () => {
    try {
      await dispatch(sendSignupOtp(formData.email)).unwrap();
      setOtpSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await dispatch(signup(formData)).unwrap();
      await dispatch(fetchUserProfile()).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <div className="auth-form-header auth-amazon-header">
        <h2>Create account</h2>
      </div>

      {successMessage && (
        <div className="alert alert-success auth-alert">{successMessage}</div>
      )}

      {error && (
        <div className="alert alert-danger auth-alert">
          {typeof error === "string" ? error : "Registration Failed"}
        </div>
      )}

      <div className="auth-field">
        <label className="auth-label">Your name</label>
        <input
          type="text"
          className="auth-amazon-input"
          name="fullName"
          placeholder="First and last name"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">Email</label>
        <input
          type="email"
          className="auth-amazon-input"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">Mobile number</label>
        <input
          type="text"
          className="auth-amazon-input"
          name="phoneNumber"
          placeholder="Enter your mobile number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="auth-field">
        <label className="auth-label">Password</label>
        <input
          type="password"
          className="auth-amazon-input"
          name="password"
          placeholder="At least 6 characters"
          value={formData.password}
          onChange={handleChange}
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
            <OtpInput
              otp={formData.otp}
              setOtp={(value) =>
                setFormData({
                  ...formData,
                  otp: value,
                })
              }
            />
          </div>

          <button type="submit" className="auth-amazon-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create your Glomo account"}
          </button>
        </>
      )}

      <p className="auth-terms-text">
        By creating an account, you agree to Glomo's Conditions of Use and
        Privacy Notice.
      </p>
    </form>
  );
};

export default RegisterForm;

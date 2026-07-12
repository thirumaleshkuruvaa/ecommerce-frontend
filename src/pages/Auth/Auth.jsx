import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import glomoLogo from "../../assets/images/login_page.png"; // use your logo image
import "../../css/auth/auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="glomo-auth-page">
      <div className="auth-page-wrapper">
        {/* TOP LOGO */}
        <div className="auth-logo-wrapper">
          <img src={glomoLogo} alt="Glomo" className="auth-logo" />
        </div>

        {/* CENTER FORM CARD */}
        <div className="auth-card amazon-style-card">
          <div className="auth-card-body">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>

        {/* BOTTOM SWITCH SECTION */}
        <div className="auth-bottom-switch">
          <div className="auth-bottom-divider">
            <span>
              {isLogin ? "New to Glomo?" : "Already have an account?"}
            </span>
          </div>

          <button
            type="button"
            className="auth-bottom-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create your Glomo account" : "Sign in to your account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

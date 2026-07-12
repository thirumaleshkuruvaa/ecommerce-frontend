import { useState } from "react";
import { useSelector } from "react-redux";
import SellerLoginForm from "../BecomeSeller/SellerLoginForm";
import SellerAuthLayout from "../BecomeSeller/SellerAuthLayout";
import SellerAccountForm from "../BecomeSeller/SellerAccountForm";
import "../../css/seller/BecomeSeller.css";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { seller } = useSelector((store) => store.seller);
  const navigate = useNavigate();

  const handleSwitchToLogin = () => setIsLogin(true);
  const handleSwitchToRegister = () => setIsLogin(false);

  return (
    <SellerAuthLayout isLogin={isLogin}>
      {seller ? (
        <div className="seller-welcome-card">
          <h2>Welcome back, {seller?.sellerName || "Seller"} 👋</h2>
          <p>Your seller account is ready. You can now manage your store.</p>

          <div className="seller-welcome-actions">
            <button
              className="btn seller-btn-primary"
              onClick={() => navigate("/seller")}
            >
              Go to Seller Dashboard
            </button>
          </div>
        </div>
      ) : isLogin ? (
        <SellerLoginForm onSwitchToRegister={handleSwitchToRegister} />
      ) : (
        <SellerAccountForm onSwitchToLogin={handleSwitchToLogin} />
      )}
    </SellerAuthLayout>
  );
};

export default BecomeSeller;

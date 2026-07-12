import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createOrder } from "../../redux/order/orderThunk";
import "../../css/pricingcard/PricingCard.css";

const PricingCard = ({
  cartData,
  selectedAddress,
  paymentMethod,
  setPaymentMethod,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [placingOrder, setPlacingOrder] = useState(false);

  const isCheckoutPage = location.pathname === "/checkout";

  const handleCheckoutOrPlaceOrder = async () => {
    if (!isCheckoutPage) {
      navigate("/checkout");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {
      setPlacingOrder(true);

      const resultAction = await dispatch(
        createOrder({
          address: selectedAddress,
          paymentMethod,
        }),
      );

      if (createOrder.fulfilled.match(resultAction)) {
        const response = resultAction.payload;

        // Razorpay Payment Link
        if (response?.paymentLinkUrl) {
          window.location.href = response.paymentLinkUrl;
          return;
        }

        alert("Payment link not received from server");
      } else {
        alert(resultAction.payload?.message || "Failed to create order");
      }
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);
      alert("Something went wrong while placing order");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="pricing-card">
      <h4 className="pricing-title">
        <i className="bi bi-receipt me-2"></i>
        Price Details
      </h4>

      <div className="price-row">
        <span>Total MRP</span>
        <span>₹{cartData?.totalMrpPrice || 0}</span>
      </div>

      <div className="price-row">
        <span>Product Discount</span>
        <span className="text-success">- ₹{cartData?.discount || 0}</span>
      </div>

      {cartData?.couponCode && (
        <div className="price-row">
          <span>Coupon ({cartData.couponCode})</span>
          <span className="text-success">
            - ₹{cartData?.couponDiscount || 0}
          </span>
        </div>
      )}

      <hr />

      <div className="price-row total-row">
        <span>Total Amount</span>
        <span>₹{cartData?.totalSellingPrice || 0}</span>
      </div>

      {cartData?.couponCode && (
        <div className="text-success small mt-2">
          Coupon Applied : {cartData.couponCode}
        </div>
      )}

      {isCheckoutPage && (
        <div className="payment-method-section mt-4">
          <h5 className="payment-title mb-3">
            <i className="bi bi-credit-card-2-front me-2"></i>
            Select Payment Method
          </h5>

          <label
            className={`payment-option ${
              paymentMethod === "RAZORPAY" ? "active-payment" : ""
            }`}
          >
            <div className="payment-content">
              <div className="payment-left">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="RAZORPAY"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <div>
                  <div className="payment-name">Razorpay</div>

                  <p className="payment-desc mb-0">
                    UPI, Cards, Wallets, Net Banking
                  </p>
                </div>
              </div>

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                alt="Razorpay"
                className="payment-logo"
              />
            </div>
          </label>
        </div>
      )}

      <button
        className="checkout-btn"
        onClick={handleCheckoutOrPlaceOrder}
        disabled={placingOrder}
      >
        <i className="bi bi-bag-check-fill me-2"></i>

        {isCheckoutPage
          ? placingOrder
            ? "Processing..."
            : "Place Order"
          : "Proceed To Checkout"}
      </button>
    </div>
  );
};

export default PricingCard;

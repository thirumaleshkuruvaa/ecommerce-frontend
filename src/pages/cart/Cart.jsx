import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItemCard from "./CartItemCard";
import PricingCard from "./PricingCard";

import { getCart } from "../../redux/cart/cartThunk";
import { applyCoupon } from "../../redux/coupon/couponThunk";

import "../../css/carts/cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  // MAIN CART FROM SERVER
  const { cart, cartItems, loading } = useSelector((state) => state.cart);

  // COUPON UPDATED CART
  const { cart: couponCart, loading: couponLoading } = useSelector(
    (state) => state.coupon,
  );

  // FINAL CART (IMPORTANT)
  const finalCart = couponCart || cart;

  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // APPLY COUPON
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    dispatch(
      applyCoupon({
        apply: true,
        code: couponCode.trim().toUpperCase(),
        orderValue: finalCart?.totalSellingPrice || 0,
      }),
    );
  };

  return (
    <div className="cart-page">
      <div className="container-fluid px-lg-5">
        {/* HEADER */}
        <div className="cart-header">
          <h2>
            <i className="bi bi-cart3 me-2"></i>
            Shopping Cart
          </h2>

          <span>{finalCart?.totalItems || 0} Items</span>
        </div>

        <div className="row g-4">
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
              </div>
            )}

            {!loading && cartItems?.length === 0 && (
              <div className="text-center py-4">Your Cart Is Empty</div>
            )}

            {/* CART ITEMS */}
            <div className="d-flex flex-column gap-3">
              {cartItems?.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* COUPON SECTION */}
            <div className="coupon-box mt-4 p-3 border rounded bg-white">
              <label className="form-label fw-semibold">Have a Coupon?</label>

              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading}
                >
                  {couponLoading ? "Applying..." : "Apply"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            {/* PRICING CARD */}
            <PricingCard cartData={finalCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

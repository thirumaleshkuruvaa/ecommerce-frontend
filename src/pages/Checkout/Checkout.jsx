import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserAddresses } from "../../redux/address/addressThunk";

import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";
import PricingCard from "../cart/PricingCard";

import "../../css/address/address.css";

const Checkout = () => {
  const dispatch = useDispatch();

  const { addresses, loading } = useSelector((state) => state.address);
  const { cart } = useSelector((state) => state.cart);
  const { cart: couponCart } = useSelector((state) => state.coupon);

  // If coupon applied, use coupon cart, otherwise normal cart
  const finalCart = couponCart || cart;

  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editData, setEditData] = useState(null);

  // IMPORTANT:
  // Must match backend enum exactly
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h3 className="fw-bold mb-0">
              <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
              Checkout
            </h3>

            <button
              className="btn btn-dark"
              onClick={() => {
                setEditData(null);
                setShowForm(true);
              }}
            >
              <i className="bi bi-plus-circle-fill me-2"></i>
              Add Address
            </button>
          </div>

          {/* Address Form */}
          {showForm && (
            <AddressForm
              closeForm={() => setShowForm(false)}
              editData={editData}
            />
          )}

          {/* Loader */}
          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border"></div>
            </div>
          )}

          {/* Address List */}
          {addresses?.length > 0 ? (
            addresses.map((item) => (
              <AddressCard
                key={item.id}
                item={item}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                setEditData={setEditData}
                setShowForm={setShowForm}
              />
            ))
          ) : (
            <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
              <h5 className="fw-bold mb-2">No Address Found</h5>
              <p className="text-muted mb-0">
                Please add a delivery address to continue checkout.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">
          <PricingCard
            cartData={finalCart}
            selectedAddress={selectedAddress}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

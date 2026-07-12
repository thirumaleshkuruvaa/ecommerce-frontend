import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchSellerProfile,
  updateSellerProfile,
  deleteSeller,
} from "../../redux/seller/sellerThunk";

import {
  sellerLogout,
  clearSellerMessage,
} from "../../redux/seller/sellerSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seller, loading, error, success } = useSelector(
    (state) => state.seller,
  );

  const [formData, setFormData] = useState({
    sellerName: "",
    email: "",
    mobile: "",
    businessName: "",
    pickupAddress: "",
    gstin: "",
    bankAccountNumber: "",
    ifscCode: "",
  });

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (seller) {
      setFormData({
        sellerName: seller.sellerName || "",
        email: seller.email || "",
        mobile: seller.mobile || "",
        businessName: seller.businessName || "",
        pickupAddress: seller.pickupAddress || "",
        gstin: seller.gstin || "",
        bankAccountNumber: seller.bankAccountNumber || "",
        ifscCode: seller.ifscCode || "",
      });
    }
  }, [seller]);

  useEffect(() => {
    return () => {
      dispatch(clearSellerMessage());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateSellerProfile(formData)).unwrap();
    } catch (err) {
      console.log("UPDATE ERROR =>", err);
    }
  };

  const handleLogout = () => {
    dispatch(sellerLogout());
    navigate("/seller/login");
  };

  const handleDeleteAccount = async () => {
    if (!seller?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete seller account?",
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteSeller(seller.id)).unwrap();
      dispatch(sellerLogout());
      navigate("/seller/login");
    } catch (err) {
      console.log("DELETE ERROR =>", err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="mb-4">Seller Account</h2>

          {success && <div className="alert alert-success">{success}</div>}
          {error && (
            <div className="alert alert-danger">
              {typeof error === "string"
                ? error
                : error?.message || "Something went wrong"}
            </div>
          )}

          {!seller && !loading && (
            <div className="alert alert-warning">
              Seller profile not found / not loaded.
            </div>
          )}

          <form onSubmit={handleUpdate}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Seller Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Business Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Pickup Address</label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">GSTIN</label>
                <input
                  type="text"
                  className="form-control"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Bank Account Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex gap-3 mt-4 flex-wrap">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

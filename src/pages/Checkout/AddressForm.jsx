import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addUserAddress,
  updateUserAddress,
} from "../../redux/address/addressThunk";
import "../../css/address/address.css";
const AddressForm = ({ closeForm, editData }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    pinCode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || "",
        mobileNumber: editData.mobileNumber || "",
        pinCode: editData.pinCode || "",
        locality: editData.locality || "",
        address: editData.address || "",
        city: editData.city || "",
        state: editData.state || "",
      });
    }
  }, [editData]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editData) {
      dispatch(
        updateUserAddress({
          id: editData.id,
          addressData: formData,
        }),
      );
    } else {
      dispatch(addUserAddress(formData));
    }

    closeForm();
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-4">
          <i className="bi bi-house-add-fill text-success me-2"></i>

          {editData ? "Update Address" : "Add New Address"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Name"
              />
            </div>

            <div className="col-md-6">
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Mobile Number"
              />
            </div>

            <div className="col-md-6">
              <input
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                className="form-control"
                placeholder="Pincode"
              />
            </div>

            <div className="col-md-6">
              <input
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                className="form-control"
                placeholder="Locality"
              />
            </div>

            <div className="col-12">
              <textarea
                rows="3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Address"
              />
            </div>

            <div className="col-md-6">
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="City"
              />
            </div>

            <div className="col-md-6">
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                placeholder="State"
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-success">
              <i className="bi bi-check-circle-fill me-2"></i>

              {editData ? "Update" : "Save"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={closeForm}
            >
              <i className="bi bi-x-circle-fill me-2"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;

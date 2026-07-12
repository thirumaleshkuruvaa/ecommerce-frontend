import { FaMapMarkerAlt, FaPhoneAlt, FaUser } from "react-icons/fa";

const SellerStep2Pickup = ({ formData, errors, handlePickupChange }) => {
  const pickup = formData.pickedUpAddress;

  return (
    <>
      <div className="seller-step-header">
        <h4>Pickup Address</h4>
        <p>Where should orders be picked up from?</p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Contact Person</label>
          <div className="seller-input-group">
            <FaUser />
            <input
              type="text"
              name="name"
              className={`form-control ${errors["pickedUpAddress.name"] ? "is-invalid" : ""}`}
              placeholder="Enter pickup contact name"
              value={pickup.name}
              onChange={handlePickupChange}
            />
          </div>
          {errors["pickedUpAddress.name"] && (
            <div className="invalid-feedback d-block">
              {errors["pickedUpAddress.name"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Pickup Mobile</label>
          <div className="seller-input-group">
            <FaPhoneAlt />
            <input
              type="text"
              name="mobile"
              className={`form-control ${errors["pickedUpAddress.mobile"] ? "is-invalid" : ""}`}
              placeholder="Enter pickup mobile"
              value={pickup.mobile}
              onChange={handlePickupChange}
            />
          </div>
          {errors["pickedUpAddress.mobile"] && (
            <div className="invalid-feedback d-block">
              {errors["pickedUpAddress.mobile"]}
            </div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <div className="seller-input-group">
            <FaMapMarkerAlt />
            <input
              type="text"
              name="address"
              className={`form-control ${errors["pickedUpAddress.address"] ? "is-invalid" : ""}`}
              placeholder="Flat / House No / Street"
              value={pickup.address}
              onChange={handlePickupChange}
            />
          </div>
          {errors["pickedUpAddress.address"] && (
            <div className="invalid-feedback d-block">
              {errors["pickedUpAddress.address"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Locality</label>
          <input
            type="text"
            name="locality"
            className={`form-control ${errors["pickedUpAddress.locality"] ? "is-invalid" : ""}`}
            placeholder="Locality / Area"
            value={pickup.locality}
            onChange={handlePickupChange}
          />
          {errors["pickedUpAddress.locality"] && (
            <div className="invalid-feedback d-block">
              {errors["pickedUpAddress.locality"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            className={`form-control ${errors["pickedUpAddress.city"] ? "is-invalid" : ""}`}
            placeholder="City"
            value={pickup.city}
            onChange={handlePickupChange}
          />
          {errors["pickedUpAddress.city"] && (
            <div className="invalid-feedback d-block">
              {errors["pickedUpAddress.city"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">State</label>
          <input
            type="text"
            name="state"
            className={`form-control ${errors["pickedUpAddress.state"] ? "is-invalid" : ""}`}
            placeholder="State"
            value={pickup.state}
            onChange={handlePickupChange}
          />
          {errors["pickedUpAddress.state"] && (
            <div className="invalid-feedback d-block">
              {errors["pickedUpAddress.state"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="pincode"
            className={`form-control ${errors["pickedUpAddress.pincode"] ? "is-invalid" : ""}`}
            placeholder="Pincode"
            value={pickup.pincode}
            onChange={handlePickupChange}
          />
          {errors["pickedUpAddress.pincode"] && (
            <div className="invalid-feedback d-block">
              {errors["pickedUpAddress.pincode"]}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerStep2Pickup;

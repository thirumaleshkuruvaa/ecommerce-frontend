import { FaEnvelope, FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { BsReceiptCutoff } from "react-icons/bs";

const SellerStep1Basic = ({ formData, errors, handleChange }) => {
  return (
    <>
      <div className="seller-step-header">
        <h4>Basic Details</h4>
        <p>Enter your seller name, contact and GST details</p>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Seller Name</label>
          <div className="seller-input-group">
            <FaUserTie />
            <input
              type="text"
              name="sellerName"
              className={`form-control ${errors.sellerName ? "is-invalid" : ""}`}
              placeholder="Enter seller full name"
              value={formData.sellerName}
              onChange={handleChange}
            />
          </div>
          {errors.sellerName && (
            <div className="invalid-feedback d-block">{errors.sellerName}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Mobile Number</label>
          <div className="seller-input-group">
            <FaPhoneAlt />
            <input
              type="text"
              name="mobile"
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          {errors.mobile && (
            <div className="invalid-feedback d-block">{errors.mobile}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email Address</label>
          <div className="seller-input-group">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter seller email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <div className="invalid-feedback d-block">{errors.email}</div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">GSTIN</label>
          <div className="seller-input-group">
            <BsReceiptCutoff />
            <input
              type="text"
              name="gstin"
              className={`form-control ${errors.gstin ? "is-invalid" : ""}`}
              placeholder="Enter GSTIN"
              value={formData.gstin}
              onChange={handleChange}
            />
          </div>
          {errors.gstin && (
            <div className="invalid-feedback d-block">{errors.gstin}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerStep1Basic;

import { FaStore, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";

const SellerStep4Business = ({
  formData,
  errors,
  handleBusinessChange,
  handleChange,
}) => {
  const business = formData.businessDetails;

  return (
    <>
      <div className="seller-step-header">
        <h4>Business Details</h4>
        <p>Complete your store details and create password</p>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Business Name</label>
          <div className="seller-input-group">
            <FaStore />
            <input
              type="text"
              name="businessName"
              className={`form-control ${errors["businessDetails.businessName"] ? "is-invalid" : ""}`}
              placeholder="Enter business name"
              value={business.businessName}
              onChange={handleBusinessChange}
            />
          </div>
          {errors["businessDetails.businessName"] && (
            <div className="invalid-feedback d-block">
              {errors["businessDetails.businessName"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Business Email</label>
          <div className="seller-input-group">
            <FaEnvelope />
            <input
              type="email"
              name="businessEmail"
              className={`form-control ${errors["businessDetails.businessEmail"] ? "is-invalid" : ""}`}
              placeholder="Enter business email"
              value={business.businessEmail}
              onChange={handleBusinessChange}
            />
          </div>
          {errors["businessDetails.businessEmail"] && (
            <div className="invalid-feedback d-block">
              {errors["businessDetails.businessEmail"]}
            </div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Business Mobile</label>
          <div className="seller-input-group">
            <FaPhoneAlt />
            <input
              type="text"
              name="businessMobile"
              className={`form-control ${errors["businessDetails.businessMobile"] ? "is-invalid" : ""}`}
              placeholder="Enter business mobile"
              value={business.businessMobile}
              onChange={handleBusinessChange}
            />
          </div>
          {errors["businessDetails.businessMobile"] && (
            <div className="invalid-feedback d-block">
              {errors["businessDetails.businessMobile"]}
            </div>
          )}
        </div>

        <div className="col-12">
          <label className="form-label">Password</label>
          <div className="seller-input-group">
            <FaLock />
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">{errors.password}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerStep4Business;

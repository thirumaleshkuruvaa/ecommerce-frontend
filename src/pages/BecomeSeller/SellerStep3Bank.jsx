import { FaUniversity, FaUser, FaCreditCard } from "react-icons/fa";

const SellerStep3Bank = ({ formData, errors, handleBankChange }) => {
  const bank = formData.bankDetails;

  return (
    <>
      <div className="seller-step-header">
        <h4>Bank Details</h4>
        <p>We’ll use this for seller settlements and payments</p>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Account Holder Name</label>
          <div className="seller-input-group">
            <FaUser />
            <input
              type="text"
              name="accountHolderName"
              className={`form-control ${errors["bankDetails.accountHolderName"] ? "is-invalid" : ""}`}
              placeholder="Enter account holder name"
              value={bank.accountHolderName}
              onChange={handleBankChange}
            />
          </div>
          {errors["bankDetails.accountHolderName"] && (
            <div className="invalid-feedback d-block">
              {errors["bankDetails.accountHolderName"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Account Number</label>
          <div className="seller-input-group">
            <FaCreditCard />
            <input
              type="text"
              name="accountNumber"
              className={`form-control ${errors["bankDetails.accountNumber"] ? "is-invalid" : ""}`}
              placeholder="Enter account number"
              value={bank.accountNumber}
              onChange={handleBankChange}
            />
          </div>
          {errors["bankDetails.accountNumber"] && (
            <div className="invalid-feedback d-block">
              {errors["bankDetails.accountNumber"]}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">IFSC Code</label>
          <div className="seller-input-group">
            <FaUniversity />
            <input
              type="text"
              name="ifscCode"
              className={`form-control ${errors["bankDetails.ifscCode"] ? "is-invalid" : ""}`}
              placeholder="Enter IFSC code"
              value={bank.ifscCode}
              onChange={handleBankChange}
            />
          </div>
          {errors["bankDetails.ifscCode"] && (
            <div className="invalid-feedback d-block">
              {errors["bankDetails.ifscCode"]}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SellerStep3Bank;

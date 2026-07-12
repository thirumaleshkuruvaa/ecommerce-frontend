import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../../redux/admincoupon/adminCouponThunk";

const AddCouponForm = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.adminCoupon,
  );

  const [form, setForm] = useState({
    code: "",
    discountPercentage: "",
    validityStartDate: "",
    validityEndDate: "",
    minimumOrderValue: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.code ||
      !form.discountPercentage ||
      !form.validityStartDate ||
      !form.validityEndDate ||
      !form.minimumOrderValue
    ) {
      return;
    }

    const couponData = {
      code: form.code.trim().toUpperCase(),
      discountPercentage: Number(form.discountPercentage),
      validityStartDate: form.validityStartDate,
      validityEndDate: form.validityEndDate,
      minimumOrderValue: Number(form.minimumOrderValue),
      active: true,
    };

    dispatch(createCoupon(couponData));

    setForm({
      code: "",
      discountPercentage: "",
      validityStartDate: "",
      validityEndDate: "",
      minimumOrderValue: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Coupon Code</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="form-control"
            placeholder="SAVE10"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Discount %</label>
          <input
            type="number"
            name="discountPercentage"
            value={form.discountPercentage}
            onChange={handleChange}
            className="form-control"
            min="1"
            max="100"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="validityStartDate"
            value={form.validityStartDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="validityEndDate"
            value={form.validityEndDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Minimum Order Value</label>
          <input
            type="number"
            name="minimumOrderValue"
            value={form.minimumOrderValue}
            onChange={handleChange}
            className="form-control"
            min="0"
            required
          />
        </div>

        {error && (
          <div className="col-12">
            <div className="alert alert-danger py-2 mb-0">
              {typeof error === "string" ? error : "Failed to create coupon"}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="col-12">
            <div className="alert alert-success py-2 mb-0">
              {successMessage}
            </div>
          </div>
        )}

        <div className="col-12">
          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Creating..." : "Create Coupon"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCouponForm;

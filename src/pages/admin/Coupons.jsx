import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CouponTable from "../../components/admin/CouponTable";
import {
  getAllCoupons,
  deleteCoupon,
} from "../../redux/admincoupon/adminCouponThunk";

const Coupons = () => {
  const dispatch = useDispatch();

  const { coupons, loading, error } = useSelector((state) => state.adminCoupon);

  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete coupon?")) {
      dispatch(deleteCoupon(id));
    }
  };

  const filteredCoupons =
    statusFilter === "All"
      ? coupons
      : coupons.filter((c) =>
          statusFilter === "Active" ? c.active : !c.active,
        );

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Coupons</h5>

        <select
          className="form-select w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="card-body">
        {loading && <p className="mb-0">Loading coupons...</p>}
        {error && <p className="text-danger mb-0">{String(error)}</p>}

        {!loading && !error && (
          <CouponTable coupons={filteredCoupons} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Coupons;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SellerTable from "../../components/admin/SellerTable";
import { fetchAllSellers } from "../../redux/adminSeller/adminSellerThunk";

const Sellers = () => {
  const dispatch = useDispatch();

  const { sellers, loading, error } = useSelector((state) => state.adminSeller);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    if (statusFilter === "ALL") {
      dispatch(fetchAllSellers());
    } else {
      dispatch(fetchAllSellers(statusFilter));
    }
  }, [dispatch, statusFilter]);

  return (
    <div className="container-fluid px-0">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <h4 className="mb-0">Seller Management</h4>

          <select
            className="form-select w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING_VERIFICATION">Pending Verification</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="DEACTIVATED">Deactivated</option>
            <option value="BANNED">Banned</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border"></div>
              <p className="mt-3 mb-0">Loading sellers...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger m-3">
              {typeof error === "string" ? error : "Failed to load sellers"}
            </div>
          ) : (
            <SellerTable sellers={sellers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sellers;

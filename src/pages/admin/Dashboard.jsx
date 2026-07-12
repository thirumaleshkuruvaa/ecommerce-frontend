import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSellers } from "../../redux/adminseller/adminSellerThunk";
import SellerTable from "../../components/admin/SellerTable";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { sellers, loading, error } = useSelector((state) => state.adminSeller);

  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    // fetch all sellers initially
    dispatch(fetchAllSellers());
  }, [dispatch]);

  const filteredSellers = useMemo(() => {
    if (statusFilter === "ALL") return sellers;
    return sellers.filter((seller) => seller.accountStatus === statusFilter);
  }, [sellers, statusFilter]);

  const totalSellers = sellers.length;
  const activeSellers = sellers.filter(
    (seller) => seller.accountStatus === "ACTIVE",
  ).length;

  const pendingSellers = sellers.filter(
    (seller) => seller.accountStatus === "PENDING_VERIFICATION",
  ).length;

  const suspendedSellers = sellers.filter(
    (seller) => seller.accountStatus === "SUSPENDED",
  ).length;

  return (
    <div className="container-fluid">
      {/* STATS */}
      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Sellers</h6>
              <h3>{totalSellers}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Active Sellers</h6>
              <h3>{activeSellers}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Pending Verification</h6>
              <h3>{pendingSellers}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Suspended Sellers</h6>
              <h3>{suspendedSellers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* SELLER MANAGEMENT */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h5 className="mb-0">Seller Management</h5>

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
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4">Loading sellers...</div>
          ) : error ? (
            <div className="text-center text-danger py-4">{String(error)}</div>
          ) : (
            <SellerTable sellers={filteredSellers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

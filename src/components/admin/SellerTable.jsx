import { useDispatch, useSelector } from "react-redux";
import { updateSellerStatus } from "../../redux/adminSeller/adminSellerThunk";

const SellerTable = ({ sellers = [] }) => {
  const dispatch = useDispatch();
  const { statusUpdatingId } = useSelector((state) => state.adminSeller);

  const handleStatusChange = (sellerId, newStatus) => {
    dispatch(updateSellerStatus({ sellerId, status: newStatus }));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-success";
      case "PENDING_VERIFICATION":
        return "bg-warning text-dark";
      case "SUSPENDED":
        return "bg-danger";
      case "DEACTIVATED":
        return "bg-secondary";
      case "BANNED":
        return "bg-dark";
      case "CLOSED":
        return "bg-info text-dark";
      default:
        return "bg-light text-dark";
    }
  };

  const formatStatus = (status) => {
    return status
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>S.No</th>
            <th>Seller Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>GSTIN</th>
            <th>Business</th>
            {/* <th>Email Verified</th> */}
            <th>Status</th>
            <th style={{ minWidth: "220px" }}>Change Status</th>
          </tr>
        </thead>

        <tbody>
          {sellers.length > 0 ? (
            sellers.map((seller, index) => (
              <tr key={seller.id}>
                <td>{index + 1}</td>
                <td className="fw-semibold">{seller.sellerName || "-"}</td>
                <td>{seller.email || "-"}</td>
                <td>{seller.mobile || "-"}</td>
                <td>{seller.gstin || "-"}</td>
                <td>{seller.businessDetails?.businessName || "-"}</td>

                {/* <td>
                  {seller.emailVerified ? (
                    <span className="badge bg-success">Verified</span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      Not Verified
                    </span>
                  )}
                </td> */}

                <td>
                  <span
                    className={`badge rounded-pill ${getStatusBadge(
                      seller.accountStatus,
                    )}`}
                  >
                    {formatStatus(seller.accountStatus)}
                  </span>
                </td>

                <td>
                  <select
                    className="form-select form-select-sm"
                    value={seller.accountStatus || "PENDING_VERIFICATION"}
                    onChange={(e) =>
                      handleStatusChange(seller.id, e.target.value)
                    }
                    disabled={statusUpdatingId === seller.id}
                  >
                    <option value="PENDING_VERIFICATION">
                      Pending Verification
                    </option>
                    <option value="ACTIVE">Active</option>
                    <option value="SUSPENDED">Suspended</option>
                    <option value="DEACTIVATED">Deactivated</option>
                    <option value="BANNED">Banned</option>
                    <option value="CLOSED">Closed</option>
                  </select>

                  {statusUpdatingId === seller.id && (
                    <small className="text-muted d-block mt-1">
                      Updating...
                    </small>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4">
                No Sellers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerTable;

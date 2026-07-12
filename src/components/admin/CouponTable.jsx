const CouponTable = ({ coupons = [], onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Discount</th>
            <th>Min Order</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {coupons.length > 0 ? (
            coupons.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td className="fw-bold text-primary">{c.code}</td>
                <td>{c.discountPercentage}%</td>
                <td>₹{c.minimumOrderValue}</td>
                <td>{c.validityStartDate}</td>
                <td>{c.validityEndDate}</td>
                <td>
                  {c.active ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Inactive</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(c.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                No Coupons Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;

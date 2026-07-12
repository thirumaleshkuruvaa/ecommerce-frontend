import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerTransactions } from "../../redux/transaction/transactionThunk";

const TransactionTable = () => {
  const dispatch = useDispatch();

  const { transactions, loading, error } = useSelector(
    (state) => state.transaction,
  );

  useEffect(() => {
    dispatch(fetchSellerTransactions());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow border-0 mt-4">
      <div className="card-header bg-white">
        <h5 className="fw-bold mb-0">
          <i className="bi bi-credit-card me-2"></i>
          Recent Transactions
        </h5>
      </div>

      <div className="table-responsive">
        <table className="table align-middle table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Order ID</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions?.length > 0 ? (
              transactions.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    {item.transactionDate
                      ? new Date(item.transactionDate).toLocaleDateString(
                          "en-IN",
                        )
                      : "-"}
                  </td>

                  <td>{item.order?.user?.email || "-"}</td>

                  <td className="fw-semibold text-primary">
                    ORD-
                    {item.order?.orderId?.substring(0, 8).toUpperCase()}
                  </td>

                  <td className="fw-bold">₹{item.amount}</td>

                  <td>
                    <span className="badge bg-success rounded-pill px-3">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No Transactions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;

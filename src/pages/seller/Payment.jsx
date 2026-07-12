// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import TransactionTable from "../../components/seller/TransactionTable";
// import { fetchSellerReport } from "../../redux/seller/sellerThunk";

// const Payment = () => {
//   const dispatch = useDispatch();

//   const { report, loading } = useSelector((state) => state.seller);

//   useEffect(() => {
//     const jwt = localStorage.getItem("seller_jwt");

//     if (jwt) {
//       dispatch(fetchSellerReport(jwt));
//     }
//   }, [dispatch]);

//   return (
//     <div className="container-fluid">
//       <h2 className="fw-bold mb-4">
//         <i className="bi bi-wallet2 me-2 text-success"></i>
//         Payment Dashboard
//       </h2>

//       {/* Earnings Card */}

//       <div
//         className="card border-0 shadow-lg mb-4 text-white"
//         style={{
//           background: "linear-gradient(135deg,#198754,#20c997)",
//           borderRadius: "20px",
//         }}
//       >
//         <div className="card-body p-5">
//           <div className="d-flex justify-content-between">
//             <div>
//               <small>Total Earnings</small>

//               <h1 className="fw-bold mt-2">
//                 ₹
//                 {loading
//                   ? "..."
//                   : report?.totalEarnings?.toLocaleString("en-IN") || 0}
//               </h1>

//               <p className="mb-0 opacity-75">
//                 Lifetime earnings from successful orders
//               </p>
//             </div>

//             <div className="display-2 opacity-50">
//               <i className="bi bi-cash-stack"></i>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Summary */}

//       <div className="row g-4 mb-4">
//         <div className="col-lg-4">
//           <div className="card shadow border-0 h-100">
//             <div className="card-body">
//               <div className="d-flex justify-content-between">
//                 <div>
//                   <small className="text-muted">Net Earnings</small>

//                   <h3 className="fw-bold text-success mt-2">
//                     ₹{report?.netEarnings?.toLocaleString("en-IN") || 0}
//                   </h3>
//                 </div>

//                 <div className="fs-1 text-success">
//                   <i className="bi bi-wallet-fill"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-4">
//           <div className="card shadow border-0 h-100">
//             <div className="card-body">
//               <div className="d-flex justify-content-between">
//                 <div>
//                   <small className="text-muted">Tax Paid</small>

//                   <h3 className="fw-bold mt-2">
//                     ₹{report?.totalTax?.toLocaleString("en-IN") || 0}
//                   </h3>
//                 </div>

//                 <div className="fs-1 text-warning">
//                   <i className="bi bi-receipt"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-4">
//           <div className="card shadow border-0 h-100">
//             <div className="card-body">
//               <div className="d-flex justify-content-between">
//                 <div>
//                   <small className="text-muted">Refunds</small>

//                   <h3 className="fw-bold text-danger mt-2">
//                     ₹{report?.totalRefunds?.toLocaleString("en-IN") || 0}
//                   </h3>
//                 </div>

//                 <div className="fs-1 text-danger">
//                   <i className="bi bi-arrow-counterclockwise"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <TransactionTable />
//     </div>
//   );
// };

// export default Payment;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TransactionTable from "../../components/seller/TransactionTable";
import { fetchSellerReport } from "../../redux/seller/sellerThunk";

const Payment = () => {
  const dispatch = useDispatch();

  const { report, loading } = useSelector((state) => state.seller);

  useEffect(() => {
    const jwt = localStorage.getItem("seller_jwt");

    if (jwt) {
      dispatch(fetchSellerReport(jwt));
    }
  }, [dispatch]);

  return (
    <div className="container-fluid py-3">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-credit-card-2-front-fill text-success me-2"></i>
            Payments
          </h2>

          <p className="text-muted mb-0">
            View settlements, earnings and payment history.
          </p>
        </div>

        <button className="btn btn-success">
          <i className="bi bi-download me-2"></i>
          Download Report
        </button>
      </div>

      {/* Summary */}

      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-muted">Total Earnings</small>

              <h3 className="fw-bold text-success mt-2">
                ₹
                {loading
                  ? "..."
                  : report?.totalEarnings?.toLocaleString("en-IN") || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-muted">Available Balance</small>

              <h3 className="fw-bold text-primary mt-2">
                ₹
                {loading
                  ? "..."
                  : report?.netEarnings?.toLocaleString("en-IN") || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-muted">Tax Paid</small>

              <h3 className="fw-bold text-warning mt-2">
                ₹{report?.totalTax?.toLocaleString("en-IN") || 0}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <small className="text-muted">Refunds</small>

              <h3 className="fw-bold text-danger mt-2">
                ₹{report?.totalRefunds?.toLocaleString("en-IN") || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}

      <div className="card border-0 shadow-sm mt-5">
        <div className="card-header bg-white">
          <h5 className="fw-bold mb-0">Recent Transactions</h5>
        </div>

        <div className="card-body">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Payment;

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useSearchParams } from "react-router-dom";

// import { verifyPayment } from "../../redux/payment/paymentThunk";

// const PaymentSuccess = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();

//   const [loading, setLoading] = useState(true);

//   const [paymentInfo, setPaymentInfo] = useState(null);

//   useEffect(() => {
//     const paymentId = searchParams.get("razorpay_payment_id");

//     const paymentLinkId = searchParams.get("razorpay_payment_link_id");

//     if (!paymentId || !paymentLinkId) {
//       navigate("/");
//       return;
//     }

//     dispatch(
//       verifyPayment({
//         paymentId,
//         paymentLinkId,
//       }),
//     ).then((result) => {
//       setLoading(false);

//       if (verifyPayment.fulfilled.match(result)) {
//         setPaymentInfo({
//           paymentId,
//           message: result.payload.messege,
//         });
//       } else {
//         navigate("/");
//       }
//     });
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "90vh" }}
//       >
//         <div className="text-center">
//           <div className="spinner-border text-success"></div>

//           <h5 className="mt-3">Verifying your payment...</h5>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container d-flex justify-content-center align-items-center"
//       style={{ minHeight: "90vh" }}
//     >
//       <div
//         className="card shadow-lg border-0"
//         style={{
//           maxWidth: "650px",
//           width: "100%",
//           borderRadius: "20px",
//         }}
//       >
//         <div className="card-body text-center p-5">
//           <div
//             className="rounded-circle bg-success text-white d-inline-flex justify-content-center align-items-center mb-4"
//             style={{
//               width: "110px",
//               height: "110px",
//               fontSize: "55px",
//             }}
//           >
//             <i className="bi bi-check-lg"></i>
//           </div>

//           <h2 className="fw-bold text-success">Payment Successful</h2>

//           <p className="text-muted">
//             Thank you for shopping with us. Your order has been placed
//             successfully.
//           </p>

//           <hr />

//           <div className="row text-start mt-4">
//             <div className="col-5 fw-semibold">Payment ID</div>

//             <div className="col-7 text-break">{paymentInfo.paymentId}</div>

//             <div className="col-5 fw-semibold mt-3">Status</div>

//             <div className="col-7 mt-3">
//               <span className="badge bg-success px-3 py-2">SUCCESS</span>
//             </div>
//           </div>

//           <div className="d-flex justify-content-center gap-3 mt-5">
//             <button
//               className="btn btn-success px-4"
//               onClick={() => navigate("/account/orders")}
//             >
//               <i className="bi bi-bag-check me-2"></i>
//               View Orders
//             </button>

//             <button
//               className="btn btn-outline-success px-4"
//               onClick={() => navigate("/")}
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { verifyPayment } from "../../redux/payment/paymentThunk";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const paymentId = searchParams.get("razorpay_payment_id");
    const paymentLinkId = searchParams.get("razorpay_payment_link_id");

    if (!paymentId || !paymentLinkId) {
      navigate("/");
      return;
    }

    dispatch(
      verifyPayment({
        paymentId,
        paymentLinkId,
      }),
    ).then((result) => {
      setLoading(false);

      if (verifyPayment.fulfilled.match(result)) {
        setPaymentInfo({
          paymentId,
          paymentLinkId,
          amount: "₹1,499",
          orderNumber: "ORD-20260706001",
          paymentMethod: "Razorpay",
          status: "SUCCESS",
          delivery: "12 Jul 2026",
        });
      } else {
        navigate("/");
      }
    });
  }, [dispatch, navigate, searchParams]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-success"
            style={{ width: "4rem", height: "4rem" }}
          ></div>

          <h4 className="mt-4 fw-bold">Verifying Payment...</h4>

          <p className="text-muted">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: "90vh" }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "20px" }}
          >
            {/* Success Header */}

            <div
              className="text-center text-white p-5"
              style={{
                background: "linear-gradient(135deg,#198754,#20c997)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              <div
                className="bg-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                style={{
                  width: "95px",
                  height: "95px",
                }}
              >
                <i
                  className="bi bi-check-lg text-success"
                  style={{ fontSize: "55px" }}
                ></i>
              </div>

              <h2 className="fw-bold">Payment Successful</h2>

              <p className="mb-0">Thank you for shopping with us.</p>
            </div>

            {/* Details */}

            <div className="card-body p-5">
              <div className="row gy-3">
                <div className="col-5 fw-semibold">Order Number</div>

                <div className="col-7">{paymentInfo.orderNumber}</div>

                <div className="col-5 fw-semibold">Payment ID</div>

                <div className="col-7 text-break">{paymentInfo.paymentId}</div>

                <div className="col-5 fw-semibold">Amount Paid</div>

                <div className="col-7">{paymentInfo.amount}</div>

                <div className="col-5 fw-semibold">Payment Method</div>

                <div className="col-7">{paymentInfo.paymentMethod}</div>

                <div className="col-5 fw-semibold">Status</div>

                <div className="col-7">
                  <span className="badge bg-success px-3 py-2">SUCCESS</span>
                </div>

                <div className="col-5 fw-semibold">Estimated Delivery</div>

                <div className="col-7">🚚 {paymentInfo.delivery}</div>
              </div>

              <hr className="my-4" />

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                  className="btn btn-success px-4"
                  onClick={() => navigate("/")}
                >
                  <i className="bi bi-shop me-2"></i>
                  Continue Shopping
                </button>

                <button
                  className="btn btn-primary px-4"
                  onClick={() => navigate("/account/orders")}
                >
                  <i className="bi bi-bag-check me-2"></i>
                  View Orders
                </button>

                <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() =>
                    alert("Invoice download will be available soon.")
                  }
                >
                  <i className="bi bi-download me-2"></i>
                  Download Invoice
                </button>
              </div>

              <div className="text-center mt-5">
                <h6 className="fw-bold">Need Help?</h6>

                <p className="text-muted mb-0">
                  Contact our support team if you have any questions regarding
                  your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

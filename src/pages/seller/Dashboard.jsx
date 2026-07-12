import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchSellerReport } from "../../redux/seller/sellerThunk";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { report, loading } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(fetchSellerReport());
  }, [dispatch]);

  const cards = [
    {
      title: "Total Orders",
      value: report?.totalOrders || 0,
      icon: "bi-bag-check-fill",
      color: "primary",
      bg: "#e8f1ff",
    },
    {
      title: "Total Revenue",
      value: `₹${(report?.totalEarnings || 0).toLocaleString("en-IN")}`,
      icon: "bi-cash-stack",
      color: "success",
      bg: "#e8fff1",
    },
    {
      title: "Net Earnings",
      value: `₹${(report?.netEarnings || 0).toLocaleString("en-IN")}`,
      icon: "bi-wallet2",
      color: "dark",
      bg: "#f4f4f4",
    },
    {
      title: "Transactions",
      value: report?.totalTransactions || 0,
      icon: "bi-credit-card-2-front-fill",
      color: "info",
      bg: "#e9fbff",
    },
    {
      title: "Total Sales",
      value: report?.totalSales || 0,
      icon: "bi-cart-check-fill",
      color: "primary",
      bg: "#eef4ff",
    },
    {
      title: "Cancelled Orders",
      value: report?.cancelOrders || 0,
      icon: "bi-x-circle-fill",
      color: "danger",
      bg: "#fff1f2",
    },
    {
      title: "Refund Amount",
      value: `₹${(report?.totalRefunds || 0).toLocaleString("en-IN")}`,
      icon: "bi-arrow-counterclockwise",
      color: "warning",
      bg: "#fff8e8",
    },
    {
      title: "Tax Paid",
      value: `₹${(report?.totalTax || 0).toLocaleString("en-IN")}`,
      icon: "bi-receipt-cutoff",
      color: "secondary",
      bg: "#f3f3f3",
    },
  ];

  return (
    <div className="container-fluid">
      {/* Header */}

      <div
        className="card border-0 shadow-lg mb-4 text-white"
        style={{
          background: "linear-gradient(135deg,#0d6efd,#3b82f6,#6366f1)",
          borderRadius: "20px",
        }}
      >
        <div className="card-body p-5">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2">Seller Dashboard</h2>

              <p className="mb-0 opacity-75">
                Welcome back! Here's your business overview.
              </p>
            </div>

            <div className="display-1 opacity-25">
              <i className="bi bi-bar-chart-line-fill"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="row g-4">
        {cards.map((card) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={card.title}>
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "18px",
                transition: ".25s",
              }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <small className="text-muted">{card.title}</small>

                    <h3 className="fw-bold mt-2 mb-0">
                      {loading ? "..." : card.value}
                    </h3>
                  </div>

                  <div
                    className={`text-${card.color}`}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "18px",
                      background: card.bg,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "32px",
                    }}
                  >
                    <i className={`bi ${card.icon}`}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Summary */}

      <div className="row mt-5">
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-sm"
            style={{ borderRadius: "18px" }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-4">Business Summary</h5>

              <div className="row">
                <div className="col-md-4">
                  <div className="text-center">
                    <h2 className="text-success fw-bold">
                      ₹{(report?.totalEarnings || 0).toLocaleString("en-IN")}
                    </h2>

                    <small className="text-muted">Total Revenue</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="text-center">
                    <h2 className="text-primary fw-bold">
                      {report?.totalOrders || 0}
                    </h2>

                    <small className="text-muted">Orders Completed</small>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="text-center">
                    <h2 className="text-danger fw-bold">
                      {report?.cancelOrders || 0}
                    </h2>

                    <small className="text-muted">Cancelled</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm h-100"
            style={{ borderRadius: "18px" }}
          >
            <div className="card-body">
              <h5 className="fw-bold mb-4">Performance</h5>

              <div className="mb-3">
                <small className="text-muted">Revenue</small>

                <div className="progress mt-2">
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <small className="text-muted">Sales</small>

                <div className="progress mt-2">
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>

              <div>
                <small className="text-muted">Customer Satisfaction</small>

                <div className="progress mt-2">
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

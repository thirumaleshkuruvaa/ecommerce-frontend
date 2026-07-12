import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserOrders, archiveOrder } from "../../redux/order/orderThunk";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const activeOrders = orders.filter((order) => !order.archived);

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="badge bg-warning text-dark px-3 py-2">Pending</span>
        );

      case "PLACED":
        return (
          <span className="badge bg-info text-dark px-3 py-2">Placed</span>
        );

      case "CONFIRMED":
        return <span className="badge bg-primary px-3 py-2">Confirmed</span>;

      case "SHIPPED":
        return <span className="badge bg-primary px-3 py-2">Shipped</span>;

      case "DELIVERED":
        return <span className="badge bg-success px-3 py-2">Delivered</span>;

      case "CANCELLED":
        return <span className="badge bg-danger px-3 py-2">Cancelled</span>;

      default:
        return <span className="badge bg-secondary px-3 py-2">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>

        <p className="mt-3 text-muted">Loading your orders...</p>
      </div>
    );
  }

  if (!loading && activeOrders.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-bag-x display-1 text-secondary"></i>

        <h3 className="mt-4 fw-bold">No Orders Yet</h3>

        <p className="text-muted">Looks like you haven't placed any orders.</p>

        <button
          className="btn btn-dark rounded-pill px-4 mt-3"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Orders</h2>

          <p className="text-muted mb-0">View and track all your orders</p>
        </div>

        <button
          className="btn btn-outline-dark rounded-pill px-4"
          onClick={() => navigate("/account/archived-orders")}
        >
          <i className="bi bi-archive me-2"></i>
          Archived Orders
        </button>
      </div>

      {activeOrders.map((order) => {
        const item = order.orderItems?.[0];

        return (
          <div
            key={order.id}
            className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden"
          >
            {/* Top Header */}

            <div className="bg-light px-4 py-3 border-bottom">
              <div className="row">
                <div className="col-md-3">
                  <small className="text-muted d-block">ORDER PLACED</small>

                  <strong>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </strong>
                </div>

                <div className="col-md-3">
                  <small className="text-muted d-block">TOTAL</small>

                  <strong>₹{order.totalSellingPrice}</strong>
                </div>

                <div className="col-md-3">
                  <small className="text-muted d-block">PAYMENT</small>

                  <strong>{order.paymentDetails?.paymentStatus}</strong>
                </div>

                <div className="col-md-3 text-md-end">
                  <small className="text-muted d-block">ORDER ID</small>

                  <strong>{order.orderId}</strong>
                </div>
              </div>
            </div>

            {/* Body */}

            <div className="card-body p-4">
              <div className="row align-items-center">
                {/* Image */}

                <div className="col-lg-2 col-md-3 text-center">
                  <img
                    src={
                      item?.product?.images?.[0] ||
                      "https://via.placeholder.com/180"
                    }
                    alt={item?.product?.title}
                    className="img-fluid rounded"
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Details */}

                <div className="col-lg-7 col-md-6 mt-4 mt-md-0">
                  <h4 className="fw-bold mb-2">{item?.product?.title}</h4>

                  <p className="text-muted mb-2">Quantity : {item?.quantity}</p>

                  <p className="text-muted mb-2">
                    Size : {item?.sizes?.join(", ")}
                  </p>

                  <p className="text-muted mb-3">
                    Expected Delivery :{" "}
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </p>

                  {getStatusBadge(order.orderStatus)}
                </div>

                {/* Actions */}

                <div className="col-lg-3 col-md-3 mt-4 mt-md-0">
                  <button
                    className="btn btn-dark w-100 rounded-pill mb-3"
                    onClick={() =>
                      navigate(`/account/orders/${order.id}`, {
                        state: order,
                      })
                    }
                  >
                    <i className="bi bi-eye me-2"></i>
                    View Details
                  </button>

                  {(order.orderStatus === "DELIVERED" ||
                    order.orderStatus === "CANCELLED") && (
                    <button
                      className="btn btn-outline-secondary w-100 rounded-pill"
                      onClick={() => dispatch(archiveOrder(order.id))}
                    >
                      <i className="bi bi-archive me-2"></i>
                      Archive Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;

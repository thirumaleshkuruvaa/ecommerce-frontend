import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getArchivedOrders,
  unArchiveOrder,
} from "../../redux/order/orderThunk";

const ArchivedOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { archivedOrders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getArchivedOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!loading && archivedOrders.length === 0) {
    return (
      <div className="card border-0 shadow rounded-4 text-center py-5">
        <div className="card-body">
          <i
            className="bi bi-archive text-secondary"
            style={{ fontSize: "70px" }}
          ></i>

          <h3 className="fw-bold mt-4">No Archived Orders</h3>

          <p className="text-muted">
            Orders that you archive will appear here.
          </p>

          <button
            className="btn btn-dark rounded-pill px-4 mt-2"
            onClick={() => navigate("/account/orders")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold mb-1">Archived Orders</h2>

          <p className="text-muted mb-0">
            Orders you've archived for later reference
          </p>
        </div>

        <button
          className="btn btn-outline-dark rounded-pill mt-2 mt-md-0"
          onClick={() => navigate("/account/orders")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Orders
        </button>
      </div>

      {archivedOrders.map((order) => {
        const item = order.orderItems?.[0];

        return (
          <div
            key={order.id}
            className="card border-0 shadow-sm rounded-4 mb-4"
          >
            <div className="card-body p-4">
              <div className="row align-items-center">
                {/* Product Image */}

                <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">
                  <img
                    src={
                      item?.product?.images?.[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item?.product?.title}
                    className="img-fluid rounded-3 border"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Details */}

                <div className="col-lg-7 col-md-6">
                  <h5 className="fw-bold">{item?.product?.title}</h5>

                  <p className="text-muted mb-2">
                    {item?.product?.description?.substring(0, 90)}...
                  </p>

                  <div className="row">
                    <div className="col-sm-6">
                      <small className="text-muted d-block">Order ID</small>

                      <strong>{order.orderId}</strong>
                    </div>

                    <div className="col-sm-6">
                      <small className="text-muted d-block">Ordered On</small>

                      <strong>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-3 d-flex flex-wrap gap-2">
                    <span className="badge bg-light text-dark border px-3 py-2">
                      Qty : {item?.quantity}
                    </span>

                    <span className="badge bg-light text-dark border px-3 py-2">
                      ₹ {order.totalSellingPrice}
                    </span>

                    <span
                      className={`badge px-3 py-2 ${
                        order.orderStatus === "DELIVERED"
                          ? "bg-success"
                          : order.orderStatus === "SHIPPED"
                            ? "bg-primary"
                            : order.orderStatus === "CONFIRMED"
                              ? "bg-info"
                              : order.orderStatus === "PLACED"
                                ? "bg-secondary"
                                : order.orderStatus === "CANCELLED"
                                  ? "bg-danger"
                                  : "bg-warning text-dark"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Buttons */}

                <div className="col-lg-3 col-md-3 mt-4 mt-md-0">
                  <button
                    className="btn btn-dark rounded-pill w-100 mb-3"
                    onClick={() =>
                      navigate(`/account/orders/${order.id}`, {
                        state: order,
                      })
                    }
                  >
                    <i className="bi bi-eye-fill me-2"></i>
                    View Details
                  </button>

                  <button
                    className="btn btn-outline-success rounded-pill w-100"
                    onClick={() => dispatch(unArchiveOrder(order.id))}
                  >
                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                    Restore Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArchivedOrders;

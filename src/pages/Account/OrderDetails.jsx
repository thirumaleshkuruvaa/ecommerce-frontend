import OrderStepper from "./OrderStepper";

const OrderDetails = ({ order }) => {
  const item = order.orderItems?.[0];

  const getStatusBadge = () => {
    switch (order.orderStatus) {
      case "PENDING":
        return (
          <span className="badge bg-warning text-dark px-3 py-2">Pending</span>
        );

      case "PLACED":
        return <span className="badge bg-secondary px-3 py-2">Placed</span>;

      case "CONFIRMED":
        return <span className="badge bg-info px-3 py-2">Confirmed</span>;

      case "SHIPPED":
        return <span className="badge bg-primary px-3 py-2">Shipped</span>;

      case "DELIVERED":
        return <span className="badge bg-success px-3 py-2">Delivered</span>;

      case "CANCELLED":
        return <span className="badge bg-danger px-3 py-2">Cancelled</span>;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="card border-0 shadow rounded-4">
        <div className="card-header bg-white border-0 p-4">
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h3 className="fw-bold mb-2">Order #{order.orderId}</h3>

              <div className="text-muted">
                <div>
                  Ordered : {new Date(order.orderDate).toLocaleDateString()}
                </div>

                <div>
                  Expected Delivery :{" "}
                  {new Date(order.deliveryDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="mt-3 mt-md-0">{getStatusBadge()}</div>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row g-4">
            {/* PRODUCT IMAGE */}

            <div className="col-lg-4 text-center">
              <img
                src={
                  item?.product?.images?.[0] ||
                  "https://via.placeholder.com/250"
                }
                alt={item?.product?.title}
                className="img-fluid rounded-4 border"
                style={{
                  maxHeight: "280px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* PRODUCT DETAILS */}

            <div className="col-lg-8">
              <h3 className="fw-bold">{item?.product?.title}</h3>

              <p className="text-muted">{item?.product?.description}</p>

              <hr />

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <small className="text-muted">Quantity</small>

                    <h6>{item?.quantity}</h6>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">Size</small>

                    <h6>{item?.sizes?.join(", ")}</h6>
                  </div>

                  <div>
                    <small className="text-muted">Selling Price</small>

                    <h4 className="text-success">₹{item?.sellingPrice}</h4>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <small className="text-muted">MRP</small>

                    <h6>₹{item?.mrpPrice}</h6>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">Payment Status</small>

                    <h6>{order.paymentDetails?.paymentStatus}</h6>
                  </div>

                  <div>
                    <small className="text-muted">Order Total</small>

                    <h3 className="fw-bold">₹{order.totalSellingPrice}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHIPPING */}

          <div className="mt-5">
            <h4 className="fw-bold mb-3">Shipping Address</h4>

            <div className="border rounded-4 p-4 bg-light">
              <h5 className="fw-bold">{order.shippingAddress?.name}</h5>

              <p className="mb-1">{order.shippingAddress?.address}</p>

              <p className="mb-1">{order.shippingAddress?.locality}</p>

              <p className="mb-1">
                {order.shippingAddress?.city}, {order.shippingAddress?.state}
              </p>

              <p className="mb-1">PIN : {order.shippingAddress?.pinCode}</p>

              <p className="mb-0">
                Mobile : {order.shippingAddress?.mobileNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      <OrderStepper order={order} />
    </>
  );
};

export default OrderDetails;

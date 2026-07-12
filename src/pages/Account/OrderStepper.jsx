const OrderStepper = ({ order }) => {
  const status = order?.orderStatus;

  const steps = [
    {
      key: "PENDING",
      title: "Order Received",
      description: "We've received your order successfully.",
      icon: "bi-cart-check",
    },
    {
      key: "PLACED",
      title: "Order Placed",
      description: "Your order has been placed.",
      icon: "bi-bag-check",
    },
    {
      key: "CONFIRMED",
      title: "Seller Confirmed",
      description: "Seller accepted your order.",
      icon: "bi-patch-check",
    },
    {
      key: "SHIPPED",
      title: "Shipped",
      description: "Your package is on the way.",
      icon: "bi-truck",
    },
    {
      key: "DELIVERED",
      title: "Delivered",
      description: order?.deliveryDate
        ? `Delivered on ${new Date(order.deliveryDate).toLocaleDateString()}`
        : "Package delivered successfully.",
      icon: "bi-house-check",
    },
  ];

  const currentStep = steps.findIndex((step) => step.key === status);

  // --------------------------
  // CANCELLED ORDER
  // --------------------------

  if (status === "CANCELLED") {
    return (
      <div className="card border-0 shadow rounded-4 mt-4">
        <div className="card-body text-center py-5">
          <div
            className="mx-auto mb-4 rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
            style={{
              width: "90px",
              height: "90px",
              fontSize: "40px",
            }}
          >
            <i className="bi bi-x-lg"></i>
          </div>

          <h3 className="fw-bold text-danger">Order Cancelled</h3>

          <p className="text-muted mt-3">This order has been cancelled.</p>

          <span className="badge bg-danger fs-6 px-4 py-2">CANCELLED</span>
        </div>
      </div>
    );
  }

  // --------------------------
  // NORMAL TRACKING
  // --------------------------

  return (
    <div className="card border-0 shadow rounded-4 mt-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Order Tracking</h4>

          <span className="badge bg-success fs-6 px-3 py-2">{status}</span>
        </div>

        {steps.map((step, index) => {
          const completed = index <= currentStep;

          return (
            <div key={step.key} className="d-flex position-relative pb-4">
              {/* Vertical Line */}

              {index !== steps.length - 1 && (
                <div
                  className={`position-absolute ${
                    completed ? "bg-success" : "bg-light border"
                  }`}
                  style={{
                    width: "3px",
                    left: "22px",
                    top: "48px",
                    height: "65px",
                  }}
                />
              )}

              {/* Circle */}

              <div
                className={`rounded-circle d-flex justify-content-center align-items-center
                ${completed ? "bg-success text-white" : "bg-white border"}`}
                style={{
                  width: "45px",
                  height: "45px",
                  minWidth: "45px",
                  zIndex: 10,
                }}
              >
                {completed ? (
                  <i className="bi bi-check-lg"></i>
                ) : (
                  <i className={`bi ${step.icon}`}></i>
                )}
              </div>

              {/* Content */}

              <div className="ms-4">
                <h5
                  className={`fw-bold mb-1 ${
                    completed ? "text-success" : "text-dark"
                  }`}
                >
                  {step.title}
                </h5>

                <p className="text-muted mb-0">{step.description}</p>

                {/* Dates */}

                {step.key === "PENDING" && order?.orderDate && (
                  <small className="text-secondary">
                    {new Date(order.orderDate).toLocaleString()}
                  </small>
                )}

                {step.key === "DELIVERED" &&
                  status === "DELIVERED" &&
                  order?.deliveryDate && (
                    <small className="text-secondary">
                      {new Date(order.deliveryDate).toLocaleString()}
                    </small>
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStepper;

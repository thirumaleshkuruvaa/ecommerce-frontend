import { useLocation } from "react-router-dom";
import OrderDetails from "./OrderDetails";
// import OrderStepper from "./OrderStepper";

const OrderItems = () => {
  const location = useLocation();

  const order = location.state;

  if (!order) {
    return <div className="alert alert-danger">Order Not Found</div>;
  }

  return (
    <div className="container">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4">
          <h3 className="fw-bold mb-4">Order Details</h3>
          <OrderDetails order={order} />
          <hr className="my-5" />
          {/* <OrderStepper status={order.orderStatus} /> */}
        </div>
      </div>
    </div>
  );
};

export default OrderItems;

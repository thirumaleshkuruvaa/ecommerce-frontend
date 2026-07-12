// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getSellerOrders,
//   updateOrderStatus,
// } from "../../redux/sellerOrder/sellerOrderThunk";

// const OrderTable = () => {
//   const dispatch = useDispatch();

//   const { orders, loading, updating } = useSelector(
//     (store) => store.sellerOrder,
//   );

//   useEffect(() => {
//     dispatch(getSellerOrders());
//   }, [dispatch]);

//   // const handleStatusChange = (orderId, status) => {
//   //   dispatch(updateOrderStatus({ orderId, status }));
//   // };

//   const handleStatusChange = async (orderId, status) => {
//     await dispatch(updateOrderStatus({ orderId, status }));

//     // REFRESH ORDERS AFTER UPDATE
//     dispatch(getSellerOrders());
//   };
//   if (loading) return <div className="p-4 text-center">Loading...</div>;

//   const getBadge = (status) => {
//     switch (status) {
//       case "DELIVERED":
//         return "bg-success";
//       case "SHIPPED":
//         return "bg-primary";
//       case "CONFIRMED":
//         return "bg-info";
//       case "PLACED":
//         return "bg-secondary";
//       case "PENDING":
//         return "bg-warning text-dark";
//       case "CANCELLED":
//         return "bg-danger";
//       default:
//         return "bg-dark";
//     }
//   };

//   return (
//     <div className="table-responsive">
//       {updating && <div className="text-primary mb-2">Updating...</div>}

//       <table className="table table-hover align-middle">
//         <thead className="table-dark">
//           <tr>
//             <th>Order Id</th>
//             <th>Customer Details</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Update</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders?.map((order) => (
//             <tr key={order.id}>
//               {/* <td>{order.orderId}</td> */}
//               <td className="fw-semibold text-primary">
//                 ORD-{order.orderId.substring(0, 8).toUpperCase()}
//               </td>

//               {/* <td>
//                 {order.user?.fullName || order.user?.firstname || "Customer"}
//               </td> */}
//               <td>
//                 <div className="fw-semibold">{order.user?.fullName}</div>

//                 <small className="text-muted">{order.user?.email}</small>
//               </td>

//               <td>₹{order.totalSellingPrice}</td>

//               <td>
//                 <span className={`badge ${getBadge(order.orderStatus)}`}>
//                   {order.orderStatus}
//                 </span>
//               </td>

//               <td>
//                 <select
//                   className="form-select form-select-sm"
//                   value={order.orderStatus}
//                   onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                 >
//                   <option value="PENDING">PENDING</option>
//                   <option value="PLACED">PLACED</option>
//                   <option value="CONFIRMED">CONFIRMED</option>
//                   <option value="SHIPPED">SHIPPED</option>
//                   <option value="DELIVERED">DELIVERED</option>
//                   <option value="CANCELLED">CANCELLED</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default OrderTable;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getSellerOrders,
  updateOrderStatus,
} from "../../redux/sellerOrder/sellerOrderThunk";

const OrderTable = () => {
  const dispatch = useDispatch();

  const { orders, loading, updating } = useSelector(
    (store) => store.sellerOrder,
  );

  useEffect(() => {
    dispatch(getSellerOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId, status) => {
    await dispatch(updateOrderStatus({ orderId, status }));
    dispatch(getSellerOrders());
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  const getBadgeClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-success";

      case "SHIPPED":
        return "bg-primary";

      case "CONFIRMED":
        return "bg-info text-dark";

      case "PLACED":
        return "bg-secondary";

      case "PENDING":
        return "bg-warning text-dark";

      case "CANCELLED":
        return "bg-danger";

      default:
        return "bg-dark";
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white border-0 py-3">
        <h4 className="fw-bold mb-0">
          <i className="bi bi-box-seam me-2 text-success"></i>
          All Orders
        </h4>
      </div>

      {updating && (
        <div className="alert alert-info rounded-0 mb-0">
          Updating order status...
        </div>
      )}

      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "120px" }}>Order</th>

              <th style={{ minWidth: "420px" }}>Product Details</th>

              <th style={{ minWidth: "280px" }}>Shipping Address</th>

              <th style={{ width: "120px" }}>Amount</th>

              <th style={{ width: "140px" }}>Status</th>

              <th style={{ width: "190px" }}>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders?.length > 0 ? (
              orders.map((order) => {
                const item = order.orderItems?.[0];
                const product = item?.product;

                return (
                  <tr key={order.id}>
                    {/* Order ID */}
                    <td>
                      <div className="fw-bold text-primary">
                        ORD-
                        {order.orderId?.substring(0, 8)?.toUpperCase()}
                      </div>

                      <small className="text-muted">#{order.id}</small>
                    </td>

                    {/* Product Details */}
                    <td>
                      <div className="d-flex align-items-start">
                        <img
                          src={
                            product?.images?.[0] ||
                            "https://placehold.co/90x90?text=Product"
                          }
                          alt={product?.title}
                          className="rounded border me-3"
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                          }}
                        />

                        <div>
                          <h6 className="fw-bold mb-2">{product?.title}</h6>

                          <div className="small text-muted">
                            <div>
                              <strong>Price :</strong> ₹{item?.sellingPrice}
                            </div>

                            <div>
                              <strong>Quantity :</strong> {item?.quantity}
                            </div>

                            <div>
                              <strong>Color :</strong> {product?.color || "-"}
                            </div>

                            <div>
                              <strong>Size :</strong> {item?.sizes || "-"}
                            </div>

                            <div className="mt-2">
                              <span className="badge bg-light text-dark border me-2">
                                {order.user?.fullName}
                              </span>

                              <span className="badge bg-light text-dark border">
                                {order.user?.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Shipping Address */}
                    <td>
                      <div className="fw-semibold">
                        {order.shippingAddress?.name}
                      </div>

                      <div className="small text-muted">
                        {order.shippingAddress?.address},
                        <br />
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}
                        <br />
                        {order.shippingAddress?.pinCode}
                      </div>

                      <div className="small mt-2">
                        <i className="bi bi-telephone me-1"></i>
                        {order.shippingAddress?.mobileNumber}
                      </div>
                    </td>

                    {/* Amount */}
                    <td>
                      <div className="fw-bold text-success">
                        ₹{order.totalSellingPrice?.toLocaleString("en-IN")}
                      </div>

                      <small className="text-muted">
                        {order.orderItems?.length} Item(s)
                      </small>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${getBadgeClass(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Update */}
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={order.orderStatus}
                        disabled={updating}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="PENDING">Pending</option>

                        <option value="PLACED">Placed</option>

                        <option value="CONFIRMED">Confirmed</option>

                        <option value="SHIPPED">Shipped</option>

                        <option value="DELIVERED">Delivered</option>

                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  <i className="bi bi-bag-x display-4 text-muted"></i>

                  <h5 className="mt-3">No Orders Found</h5>

                  <p className="text-muted mb-0">
                    Orders will appear here once customers purchase your
                    products.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;

import OrderTable from "../../components/seller/OrderTable";

const Orders = () => {
  return (
    <div className="container-fluid">
      <div className="card shadow border-0">
        <div className="card-body">
          <h3 className="mb-3">
            <i className="bi bi-bag-check me-2"></i>
            Seller Orders
          </h3>

          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default Orders;

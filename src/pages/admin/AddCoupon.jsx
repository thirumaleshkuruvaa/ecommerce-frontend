import AddCouponForm from "../../components/admin/AddCouponForm";

const AddCoupon = () => {
  return (
    <div className="container-fluid">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white">
          <h4 className="mb-0">Add Coupon</h4>
        </div>

        <div className="card-body">
          <AddCouponForm />
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;

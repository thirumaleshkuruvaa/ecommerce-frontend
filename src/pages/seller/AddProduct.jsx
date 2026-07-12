import AddProductForm from "../../components/seller/AddProductForm";

const AddProduct = () => {
  return (
    <div className="container-fluid py-3">
      <div className="card shadow border-0">
        <div className="card-body">
          <h3 className="fw-bold mb-4">
            <i className="bi bi-bag-plus-fill me-2 text-primary"></i>
            Add New Product
          </h3>

          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

import ProductTable from "../../components/seller/ProductTable";

const Products = () => {
  return (
    <div className="container-fluid">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h3 className="mb-4">
            <i className="bi bi-box-seam me-2"></i>
            My Products
          </h3>

          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Products;

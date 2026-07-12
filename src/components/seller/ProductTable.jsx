import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSellerProducts,
  deleteProduct,
  updateProduct,
} from "../../redux/sellerProducts/SellerProductThunk.jsx";

const ProductTable = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (store) => store.sellerProduct,
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure to delete this product?")) {
  //     return;
  //   }

  //   await dispatch(deleteProduct(id));

  //   alert("Product deleted successfully");
  // };
  // const handleDelete = async (id) => {
  //   const jwt = localStorage.getItem("seller_jwt");

  //   if (!window.confirm("Are you sure to delete this product?")) {
  //     return;
  //   }

  //   const result = await dispatch(
  //     deleteProduct({
  //       productId: id,
  //       jwt,
  //     }),
  //   );

  //   console.log("DELETE RESULT => ", result);

  //   if (result.meta.requestStatus === "fulfilled") {
  //     await dispatch(fetchSellerProducts());
  //     alert("Product Deleted Successfully");
  //   } else {
  //     alert(result.payload);
  //   }
  // };
  const handleDelete = async (id) => {
    console.log("ID RECEIVED =>", id);

    const jwt = localStorage.getItem("seller_jwt");

    const result = await dispatch(
      deleteProduct({
        productId: id,
        jwt,
      }),
    );

    console.log("DELETE RESULT =>", result);
  };
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSave = async () => {
    const jwt = localStorage.getItem("seller_jwt");

    await dispatch(
      updateProduct({
        productId: selectedProduct.id,
        productData: selectedProduct,
        jwt,
      }),
    );

    setShowModal(false);

    alert("Product updated successfully");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <>
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>
          <i className="bi bi-box-seam me-2"></i>
          Total Products : {products.length}
        </h5>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>MRP</th>
              <th>Selling Price</th>
              <th>Stock</th>
              <th>Color</th>
              <th width="150">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    width="60"
                    height="60"
                    className="rounded border"
                  />
                </td>

                <td>{product.title}</td>

                <td>₹{product.mrpPrice}</td>

                <td>
                  <strong>₹{product.sellingPrice}</strong>
                </td>

                <td>
                  <span className="badge bg-success">{product.quantity}</span>
                </td>

                <td>{product.color}</td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => openEditModal(product)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedProduct && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Product</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <label className="form-label">Product Title</label>

                <input
                  className="form-control mb-3"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                />

                <label className="form-label">Selling Price</label>

                <input
                  type="number"
                  className="form-control mb-3"
                  value={selectedProduct.sellingPrice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      sellingPrice: e.target.value,
                    })
                  }
                />

                <label className="form-label">Quantity</label>

                <input
                  type="number"
                  className="form-control"
                  value={selectedProduct.quantity}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-success" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;

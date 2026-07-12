import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getWishlist,
  toggleWishlist,
} from "../../redux/wishlist/wishlistThunk";

import "../../css/wishlist/Wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(toggleWishlist(productId));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container-fluid px-lg-5">
        <div className="wishlist-header">
          <h2>
            <i className="bi bi-heart-fill text-danger me-2"></i>
            My Wishlist
          </h2>

          <span>{products?.length || 0} Items</span>
        </div>

        {products?.length === 0 ? (
          <div className="empty-wishlist">
            <i className="bi bi-heart"></i>
            <h4>Your Wishlist Is Empty</h4>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                key={product.id}
              >
                <div className="wishlist-card">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="wishlist-image"
                  />

                  <div className="wishlist-body">
                    <h6 className="wishlist-brand">{product.brand}</h6>

                    <p className="wishlist-title">{product.title}</p>

                    <div className="wishlist-price">
                      <span className="selling-price">
                        ₹{product.sellingPrice}
                      </span>

                      <span className="mrp-price">₹{product.mrpPrice}</span>

                      <span className="discount">
                        {product.discountPercent}% OFF
                      </span>
                    </div>

                    <div className="wishlist-actions">
                      <button
                        className="btn btn-primary"
                        // onClick={() => navigate(`/product/${product.id}`)}
                        onClick={() =>
                          navigate(
                            `/product-details/${product.category?.categoryId}/${product.title}/${product.id}`,
                          )
                        }
                      >
                        View Product
                      </button>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemove(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

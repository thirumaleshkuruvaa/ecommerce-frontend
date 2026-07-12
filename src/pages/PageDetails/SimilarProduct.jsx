import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSimilarProducts } from "../../redux/customer/productThunk";
import ProductCard from "../Product/ProductCard";
import "../../css/SimilarProductCard.css";

const SimilarProduct = ({ product }) => {
  const dispatch = useDispatch();

  const { similarProducts, similarLoading } = useSelector(
    (store) => store.product,
  );

  useEffect(() => {
    if (product?.category?.categoryId) {
      dispatch(
        getSimilarProducts({
          category: product.category.categoryId,
          brand: product.brand,
          currentProductId: product.id,
        }),
      );
    }
  }, [dispatch, product]);

  if (!product) return null;

  return (
    <div className="similar-products-section">
      <div className="similar-header">
        <h3 className="similar-title">
          <i className="bi bi-stars me-2"></i>
          Similar Products
        </h3>
        <p className="similar-subtitle">
          You may also like these related products
        </p>
      </div>

      {similarLoading ? (
        <div className="similar-loading">
          <div className="spinner-border text-dark"></div>
        </div>
      ) : similarProducts?.length > 0 ? (
        <div className="similar-products-grid">
          {similarProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="similar-empty">No similar products found</div>
      )}
    </div>
  );
};

export default SimilarProduct;

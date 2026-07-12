import "../../css/product/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product?.images?.[0]}
          alt={product?.title}
          className="product-image"
        />

        {product?.discountPercent > 0 && (
          <span className="discount-badge">{product.discountPercent}% OFF</span>
        )}
      </div>

      <div className="product-content">
        <p className="product-brand">{product?.brand}</p>

        <h6 className="product-title">{product?.title}</h6>

        <p className="product-description">
          {product?.description?.slice(0, 40)}...
        </p>

        <div className="price-section">
          <span className="product-price">₹{product?.sellingPrice}</span>

          <span className="old-price">₹{product?.mrpPrice}</span>
        </div>

        <button
          className="add-cart-btn"
          onClick={() => {
            const productName = product.title
              .toLowerCase()
              .replaceAll(" ", "-");

            navigate(
              `/product-details/${product.category.categoryId}/${productName}/${product.id}`,
            );
          }}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

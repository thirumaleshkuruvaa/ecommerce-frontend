import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../css/ProductDetails.css";
import SimilarProduct from "../PageDetails/SimilarProduct";
import Review from "../Review/Review";

import { getProductById } from "../../redux/customer/productThunk";
import { addToCart } from "../../redux/cart/cartThunk";
import { toggleWishlist } from "../../redux/wishlist/wishlistThunk";

const ProductDetails = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector((store) => store.product);

  const [selectedImage, setSelectedImage] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] = useState("");

  const [buying, setBuying] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  const displayImage = selectedImage || product?.images?.[0];
  const handleAddToCart = async () => {
    if (product?.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    try {
      const result = await dispatch(
        addToCart({
          productId: product.id,
          sizes: selectedSize ? [selectedSize] : [],
          quantity,
        }),
      );

      if (result.meta.requestStatus === "fulfilled") {
        alert("Added To Cart Successfully");
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleBuyNow = async () => {
    if (product?.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    try {
      setBuying(true);

      const result = await dispatch(
        addToCart({
          productId: product.id,
          sizes: selectedSize ? [selectedSize] : [],
          quantity,
        }),
      );

      if (result.meta.requestStatus === "fulfilled") {
        navigate("/checkout");
      } else {
        alert("Unable to proceed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setBuying(false);
    }
  };
  if (loading || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>

        <h5 className="mt-3">Loading Product...</h5>
      </div>
    );
  }

  const handleWishlist = () => {
    dispatch(toggleWishlist(product.id));
  };

  return (
    <div className="product-page-wrapper">
      <div className="container-xxl py-4">
        <div className="row g-4 align-items-start">
          {/* LEFT IMAGE SECTION */}

          <div className="col-lg-5 col-md-6">
            <div className="product-image-card">
              <div className="row g-3">
                {/* Thumbnail Images */}

                <div className="col-2">
                  <div className="small-image-section">
                    {product?.images?.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={product.title}
                        className={`small-product-image ${
                          displayImage === img ? "active-image" : ""
                        }`}
                        onClick={() => setSelectedImage(img)}
                      />
                    ))}
                  </div>
                </div>

                {/* Main Image */}

                <div className="col-10">
                  <div className="main-image-wrapper">
                    <img
                      src={displayImage}
                      alt={product.title}
                      className="main-product-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT DETAILS */}

          <div className="col-lg-7 col-md-6">
            <div className="product-info-section">
              {/* BRAND */}

              <div className="mb-2">
                <h5 className="brand-name mb-1">{product.brand}</h5>

                <h2 className="product-name">{product.title}</h2>
              </div>

              {/* RATING */}

              <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                <span className="badge bg-success rating-badge">
                  {product?.averageRating?.toFixed(1) || "0.0"}

                  <i className="bi bi-star-fill ms-1 text-warning"></i>
                </span>

                <span className="text-muted">
                  {product?.totalRatings || 0} Ratings
                </span>
              </div>

              {/* PRICE */}

              <div className="price-section">
                <div className="d-flex align-items-center flex-wrap gap-3">
                  <span className="current-price">₹{product.sellingPrice}</span>

                  <span className="old-price">₹{product.mrpPrice}</span>

                  <span className="discount-text">
                    {product.discountPercent}% OFF
                  </span>
                </div>

                <p className="tax-text mt-2 mb-0">
                  Inclusive of all taxes · Free Shipping above ₹1500
                </p>
              </div>

              {/* PRICE */}

              {/* 
              <div className="price-section mb-3">
                <span className="current-price">₹{product.sellingPrice}</span>

                <span className="old-price">₹{product.mrpPrice}</span>

                <span className="discount-text">
                  {product.discountPercent}% OFF
                </span>
              </div>

              <p className="tax-text mb-4">
                Inclusive of all taxes. Free Shipping above ₹1500.
              </p> */}

              {/* FEATURES */}

              <div className="features-section mb-4">
                <div className="feature-item">
                  <i className="bi bi-patch-check-fill feature-icon"></i>
                  <span>Authentic & Quality Assured</span>
                </div>

                <div className="feature-item">
                  <i className="bi bi-shield-check feature-icon"></i>
                  <span>100% Money Back Guarantee</span>
                </div>

                <div className="feature-item">
                  <i className="bi bi-truck feature-icon"></i>
                  <span>Free Shipping & Returns</span>
                </div>

                <div className="feature-item">
                  <i className="bi bi-wallet2 feature-icon"></i>
                  <span>Cash On Delivery Available</span>
                </div>
              </div>

              {/* COLOR */}

              <div className="mb-4">
                <h6 className="size-title">Color</h6>

                <p className="mb-0">{product.color}</p>
              </div>

              {/* SIZE */}

              {product?.sizes?.length > 0 && (
                <div className="mb-4">
                  <h6 className="size-title">Select Size</h6>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`size-btn ${
                          selectedSize === size ? "active-size" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STOCK */}

              <div className="mb-4">
                <h6 className="size-title">Available Stock</h6>

                <p className="mb-0 fw-semibold text-success">
                  {product.quantity} Items Available
                </p>
              </div>

              {/* QUANTITY */}

              <div className="quantity-section mb-4">
                <h6 className="size-title mb-2">Quantity</h6>

                <div className="quantity-box">
                  <button
                    disabled={quantity === 1}
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>

                  <span className="quantity-value">{quantity}</span>

                  <button
                    disabled={quantity >= product.quantity}
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="row g-2 mb-4">
                <div className="col-lg-4 col-md-4 col-12">
                  <button
                    className="btn add-cart-btn w-100"
                    onClick={handleAddToCart}
                    disabled={buying}
                  >
                    <i className="bi bi-cart-plus-fill me-2"></i>
                    Add To Cart
                  </button>
                </div>

                <div className="col-lg-4 col-md-4 col-12">
                  <button
                    className="btn buy-now-btn w-100"
                    onClick={handleBuyNow}
                    disabled={buying}
                  >
                    <i className="bi bi-lightning-charge-fill me-2"></i>

                    {buying ? "Processing..." : "Buy Now"}
                  </button>
                </div>

                <div className="col-lg-4 col-md-4 col-12">
                  <button
                    className="btn btn-outline-danger w-100 wishlist-btn"
                    onClick={handleWishlist}
                    disabled={buying}
                  >
                    <i className="bi bi-heart me-2"></i>
                    Wishlist
                  </button>
                </div>
              </div>
              {/* DESCRIPTION */}

              <div className="product-description">
                <h5 className="desc-title">
                  <i className="bi bi-card-text"></i>
                  Product Description
                </h5>

                <p className="desc-text">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Review product={product} />
      {/* SIMILAR PRODUCTS */}
      <div className="similar-product-wrapper">
        <div className="container-fluid">
          <SimilarProduct product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import { useState } from "react";
import { useDispatch } from "react-redux";

import { uploadToCloudinary } from "../../utils/uploadToCloundinary";
import { createProduct } from "../../redux/sellerProducts/SellerProductThunk";

const AddProductForm = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    mrpPrice: "",
    sellingPrice: "",
    quantity: "",
    brand: "",
    color: "",
    category: "",
    category2: "",
    category3: "",
    size: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    setLoading(true);

    try {
      const uploadedImages = [];

      for (const file of files) {
        const imageUrl = await uploadToCloudinary(file);

        if (imageUrl) {
          uploadedImages.push(imageUrl);
        }
      }

      setImages((prev) => [...prev, ...uploadedImages]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("seller_jwt");

    if (images.length === 0) {
      setMessage("Please upload at least one image");
      return;
    }

    const productData = {
      title: product.title,
      description: product.description,

      mrpPrice: Number(product.mrpPrice),

      sellingPrice: Number(product.sellingPrice),

      quantity: Number(product.quantity),

      brand: product.brand,

      color: product.color,

      images,

      category: product.category,

      category2: product.category2,

      category3: product.category3,

      sizes: product.size
        ? product.size
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };

    try {
      await dispatch(
        createProduct({
          productData,
          jwt,
        }),
      ).unwrap();

      setMessage("Product Added Successfully");

      setProduct({
        title: "",
        description: "",
        mrpPrice: "",
        sellingPrice: "",
        quantity: "",
        brand: "",
        color: "",
        category: "",
        category2: "",
        category3: "",
        size: "",
      });

      setImages([]);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(
        typeof error === "string" ? error : "Failed To Create Product",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div
          className={`alert ${
            message.includes("Successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}

      {/* TITLE */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Product Title</label>

        <input
          type="text"
          className="form-control"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Description</label>

        <textarea
          rows="4"
          className="form-control"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* PRICE */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">MRP Price</label>

          <input
            type="number"
            className="form-control"
            name="mrpPrice"
            value={product.mrpPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Selling Price</label>

          <input
            type="number"
            className="form-control"
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* STOCK & BRAND */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Quantity</label>

          <input
            type="number"
            className="form-control"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Brand</label>

          <input
            type="text"
            className="form-control"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* COLOR */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Color</label>

        <input
          type="text"
          className="form-control"
          name="color"
          value={product.color}
          onChange={handleChange}
        />
      </div>

      {/* CATEGORYS */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Category</label>

          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Men"
            value={product.category}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Category 2</label>

          <input
            type="text"
            className="form-control"
            name="category2"
            placeholder="Clothing"
            value={product.category2}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4 mb-3">
          <label className="form-label fw-semibold">Category 3</label>

          <input
            type="text"
            className="form-control"
            name="category3"
            placeholder="Shirts"
            value={product.category3}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* SIZE */}
      <div className="mb-3">
        <label className="form-label fw-semibold">Sizes</label>

        <input
          type="text"
          className="form-control"
          name="size"
          placeholder="S,M,L,XL"
          value={product.size}
          onChange={handleChange}
        />
      </div>

      {/* IMAGE */}
      <div className="mb-3">
        <label className="form-label fw-semibold">
          <i className="bi bi-image me-2"></i>
          Product Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          className="form-control"
          onChange={handleImageChange}
        />
      </div>

      {/* LOADER */}
      {loading && (
        <div className="mb-3">
          <div className="spinner-border text-primary"></div>
        </div>
      )}

      {/* PREVIEW */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        {images.map((img, index) => (
          <div key={index} className="position-relative">
            <img
              src={img}
              alt="product"
              className="rounded border shadow-sm"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
              }}
            />

            <button
              type="button"
              className="btn btn-danger btn-sm position-absolute top-0 end-0"
              onClick={() => removeImage(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-100"
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Uploading...
          </>
        ) : (
          <>
            <i className="bi bi-plus-circle me-2"></i>
            Add Product
          </>
        )}
      </button>
    </form>
  );
};

export default AddProductForm;

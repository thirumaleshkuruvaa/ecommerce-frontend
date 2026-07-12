import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  updateCartItem,
  deleteCartItem,
  // getCart,
} from "../../redux/cart/cartThunk";

import "../../css/carts/CartItem.css";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const increaseQty = async () => {
    const qty = quantity + 1;

    setQuantity(qty);

    await dispatch(
      updateCartItem({
        cartItemId: item.id,
        data: { quantity: qty },
      }),
    );
  };
  const decreaseQty = async () => {
    if (quantity === 1) return;

    const qty = quantity - 1;

    setQuantity(qty);

    await dispatch(
      updateCartItem({
        cartItemId: item.id,
        data: { quantity: qty },
      }),
    );
  };
  const removeItem = async () => {
    await dispatch(deleteCartItem(item.id));

    // dispatch(getCart());
  };

  return (
    <div className="card cart-item shadow-sm border-0">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={item.product?.images?.[0]}
            alt={item.product?.title}
            className="cart-img"
          />
        </div>

        <div className="col-md-9">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="brand-name">{item.product?.brand}</h5>

                <p className="product-title">{item.product?.title}</p>

                {item.sizes?.length > 0 && (
                  <p className="size-text">
                    Size:
                    <b> {item.sizes.join(", ")}</b>
                  </p>
                )}
              </div>

              <button
                onClick={removeItem}
                className="btn btn-outline-danger btn-sm"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>

            <div className="price-box">
              <span className="selling-price">₹{item.sellingPrice}</span>

              <span className="mrp-price">₹{item.mrpPrice}</span>
            </div>

            <div className="cart-bottom">
              <div className="quantity-box">
                <button onClick={decreaseQty}>
                  <i className="bi bi-dash"></i>
                </button>

                <span>{quantity}</span>

                <button onClick={increaseQty}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

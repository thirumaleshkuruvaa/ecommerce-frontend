export const sumCartItemMrpPrice = (cartItems = []) => {
  return cartItems.reduce(
    (total, item) => total + (item.mrpPrice || 0) * (item.quantity || 0),
    0,
  );
};

export const sumCartItemSellingPrice = (cartItems = []) => {
  return cartItems.reduce(
    (total, item) => total + (item.sellingPrice || 0) * (item.quantity || 0),
    0,
  );
};

export const calculateDiscount = (cartItems = []) => {
  return sumCartItemMrpPrice(cartItems) - sumCartItemSellingPrice(cartItems);
};

export const calculateTotalItems = (cartItems = []) => {
  return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
};

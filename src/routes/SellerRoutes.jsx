import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/seller/Dashboard";
import Orders from "../pages/seller/Orders";
import Products from "../pages/seller/Products";
import AddProduct from "../pages/seller/AddProduct";
import Payment from "../pages/seller/Payment";
import Transaction from "../pages/seller/Transaction";
import Profile from "../pages/seller/Profile";
import PaymentSuccess from "../pages/seller/PaymentSuccess";

const SellerRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="orders" element={<Orders />} />
      <Route path="products" element={<Products />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="payment" element={<Payment />} />
      <Route path="transaction" element={<Transaction />} />
      {/*  FIXED ROUTE */}
      // <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="account" element={<Profile />} />
    </Routes>
  );
};

export default SellerRoutes;

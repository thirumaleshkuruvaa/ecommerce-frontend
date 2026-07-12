import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import Coupons from "../pages/admin/Coupons";
import AddCoupon from "../pages/admin/AddCoupon";
import HomeCategory from "../pages/admin/HomeCategory";
import Deals from "../pages/admin/Deals";
import Sellers from "../pages/admin/Sellers";
import Account from "../pages/admin/Account";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="coupons" element={<Coupons />} />
      <Route path="add-coupon" element={<AddCoupon />} />
      <Route path="home-category" element={<HomeCategory />} />
      <Route path="deals" element={<Deals />} />
      <Route path="sellers" element={<Sellers />} />
      <Route path="account" element={<Account />} />
    </Routes>
  );
};

export default AdminRoutes;

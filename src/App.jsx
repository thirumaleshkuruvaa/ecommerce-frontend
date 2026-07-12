import { Routes, Route, useLocation } from "react-router-dom";

/* =========================
   LAYOUT COMPONENTS
========================= */
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

/* =========================
   CUSTOMER PAGES
========================= */
import Home from "./pages/home/Home";
import Product from "./pages/Product/Product";
import ProductDetails from "./pages/PageDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import Auth from "./pages/Auth/Auth";

/* =========================
   ACCOUNT PAGES
========================= */
import Account from "./pages/Account/Account";
import Orders from "./pages/Account/Orders";
import OrderItems from "./pages/Account/OrderItems";
import UserProfileCard from "./pages/Account/UserProfileCard";
import SavedCards from "./pages/Account/SavedCards";
import UserAddressesCard from "./pages/Account/UserAddressesCard";
import ArchivedOrders from "./pages/Account/ArchiveOrders";

/* =========================
   SELLER PAGES
========================= */
import BecomeSeller from "./pages/BecomeSeller/BecomeSeller";
import SellerDashBoard from "./pages/seller/SellerDashBoard";
import PaymentSuccess from "./pages/seller/PaymentSuccess";

/* =========================
   ADMIN PAGES
========================= */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";

/* =========================
   ROUTE PROTECTION
========================= */
import SellerProtectedRoute from "./routes/SellerProtectedRoutes";
import AdminProtectedRoutes from "./routes/AdminProtectedRoutes";

/* =========================
   CHAT BOT
========================= */
import ChatBot from "./components/chat/chatbot";

/* =========================
   FOOTER PAGES
========================= */
import {
  About,
  Careers,
  Contact,
  Press,
  Returns,
  Shipping,
  FAQ,
  Advertise,
  NotFound,
} from "./components/Footer/FooterPages";

/* =========================
   STYLES
========================= */
import "./css/seller.css";

function App() {
  const location = useLocation();

  /* =========================
     CHECK CURRENT ROUTE
  ========================= */

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isSellerRoute = location.pathname.startsWith("/seller");

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      {!isAdminRoute && !isSellerRoute && <Navbar />}

      {/* =========================
          APPLICATION ROUTES
      ========================= */}

      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/become-seller" element={<BecomeSeller />} />

        {/* =========================
            PRODUCT ROUTES
        ========================= */}

        <Route path="/products" element={<Product />} />

        <Route path="/products/:mainCategory" element={<Product />} />

        <Route
          path="/products/:mainCategory/:levelTwoCategory"
          element={<Product />}
        />

        <Route
          path="/products/:mainCategory/:levelTwoCategory/:levelThreeCategory"
          element={<Product />}
        />

        <Route
          path="/product-details/:categoryId/:name/:productId"
          element={<ProductDetails />}
        />

        {/* =========================
            SELLER ROUTES
        ========================= */}

        <Route
          path="/seller/*"
          element={
            <SellerProtectedRoute>
              <SellerDashBoard />
            </SellerProtectedRoute>
          }
        />

        {/* =========================
            ADMIN ROUTES
        ========================= */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<AdminProtectedRoutes />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>

        {/* =========================
            USER PROTECTED ROUTES
        ========================= */}

        <Route
          path="/checkout"
          element={
            <SellerProtectedRoute>
              <Checkout />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/account/*"
          element={
            <SellerProtectedRoute>
              <Account />
            </SellerProtectedRoute>
          }
        >
          <Route index element={<Orders />} />

          <Route path="orders" element={<Orders />} />

          <Route path="orders/:id" element={<OrderItems />} />

          <Route path="profile" element={<UserProfileCard />} />

          <Route path="saved-cards" element={<SavedCards />} />

          <Route path="addresses" element={<UserAddressesCard />} />

          <Route path="archived-orders" element={<ArchivedOrders />} />
        </Route>

        {/* =========================
            PAYMENT
        ========================= */}

        <Route
          path="/payment-success/:paymentOrderId"
          element={<PaymentSuccess />}
        />

        {/* =========================
            FOOTER PAGES
        ========================= */}

        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/press" element={<Press />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/advertise" element={<Advertise />} />

        {/* =========================
            404 PAGE
        ========================= */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* =========================
          CHAT BOT
      ========================= */}

      {/* Hide chatbot on Admin, Seller and Login pages */}

      {!isAdminRoute && !isSellerRoute && location.pathname !== "/login" && (
        <ChatBot />
      )}

      {/* =========================
          FOOTER
      ========================= */}

      {!isAdminRoute && !isSellerRoute && <Footer />}
    </>
  );
}

export default App;

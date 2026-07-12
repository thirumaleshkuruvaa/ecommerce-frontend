import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../css/Navbar.css";
import CategorySheet from "../CategorySheet";

import { fetchUserProfile } from "../../redux/Auth/authThunk";
import { logout } from "../../redux/Auth/authSlice";
import { searchProducts } from "../../redux/customer/productThunk";
import { getCart } from "../../redux/cart/cartThunk";

//import avatarImage from "../../assets/images/avatar.jpeg";
import glomoLogo from "../../assets/images/login_page.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [showCategory, setShowCategory] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { user, jwt } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const isLoggedIn = !!jwt;

  const categories = ["Men", "Women", "Electronics", "Home & Furniture"];

  useEffect(() => {
    if (jwt && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, jwt, user]);

  useEffect(() => {
    if (jwt) {
      dispatch(getCart());
    }
  }, [dispatch, jwt]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    await dispatch(searchProducts(searchText.trim()));
    navigate("/products");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  const getInitials = (fullName) => {
    if (!fullName) return "U";

    const names = fullName.trim().split(" ");

    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }

    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  const renderUserAvatar = () => {
    return (
      <div
        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
        style={{
          width: "40px",
          height: "40px",
          minWidth: "40px",
          fontSize: "15px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {getInitials(user?.fullName)}
      </div>
    );
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top glomo-navbar">
        <div className="container-fluid glomo-navbar-container px-lg-4">
          {/* LEFT SECTION = LOGO + CATEGORY */}
          <div className="glomo-left-section">
            {/* LOGO */}

            <div
              className="glomo-logo-wrapper"
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={glomoLogo} alt="Glomo" className="glomo-logo" />

              <small
                style={{
                  marginTop: "1px",
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "#6c757d",
                  letterSpacing: "0.4px",
                  lineHeight: "1",
                  whiteSpace: "nowrap",
                }}
              >
                Global Mobile Marketplace
              </small>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* CATEGORY LINKS */}
            <div
              className="collapse navbar-collapse glomo-category-collapse"
              id="navbarContent"
            >
              <ul className="navbar-nav navbar-category-list">
                {categories.map((category) => (
                  <li
                    key={category}
                    className="nav-item"
                    onMouseEnter={() => {
                      setSelectedCategory(category);
                      setShowCategory(true);
                    }}
                  >
                    <span className="nav-link category-link">{category}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="navbar-right-section d-flex align-items-center gap-3">
            {/* SEARCH */}

            <form
              className="d-flex align-items-center flex-grow-1 mx-3"
              onSubmit={handleSearch}
              style={{
                maxWidth: "700px",
                width: "100%",
                height: "52px",
                border: "2px solid #ddd",
                borderRadius: "30px",
                overflow: "hidden",
                backgroundColor: "#fff",
                transition: "all 0.3s ease",
              }}
            >
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search Glomo.in"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={(e) => {
                  const form = e.target.closest("form");
                  form.style.border = "2px solid #0d6efd";
                  form.style.boxShadow = "0 0 10px rgba(13,110,253,0.25)";
                }}
                onBlur={(e) => {
                  const form = e.target.closest("form");
                  form.style.border = "2px solid #ddd";
                  form.style.boxShadow = "none";
                }}
                style={{
                  fontSize: "16px",
                  padding: "0 20px",
                  background: "transparent",
                  height: "100%",
                }}
              />

              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "none",
                  width: "65px",
                  height: "100%",
                  borderRadius: "0 30px 30px 0", // Rounded right side
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#0b5ed7";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#0d6efd";
                }}
              >
                <i className="bi bi-search fs-5"></i>
              </button>
            </form>
            {/* WISHLIST */}
            <Link to="/wishlist" className="nav-icon-link" title="Wishlist">
              <i className="bi bi-heart"></i>
            </Link>

            {/* CART */}
            <button
              className="btn nav-icon-btn position-relative"
              onClick={() => navigate("/cart")}
              title="Cart"
            >
              <i className="bi bi-cart3"></i>
              <span className="cart-badge">{cart?.totalItems || 0}</span>
            </button>

            {/* USER */}
            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle user-btn d-flex align-items-center gap-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {renderUserAvatar()}

                  <span className="user-name">{user?.fullName || "User"}</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/account/profile")}
                    >
                      <i className="bi bi-person me-2"></i>
                      My Profile
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/account/orders")}
                    >
                      <i className="bi bi-bag me-2"></i>
                      My Orders
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/account/addresses")}
                    >
                      <i className="bi bi-geo-alt me-2"></i>
                      Addresses
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/seller")}
                    >
                      <i className="bi bi-shop me-2"></i>
                      Seller Panel
                    </button>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-primary login-btn"
                onClick={() => navigate("/login")}
              >
                <i className="bi bi-person-circle me-2"></i>
                Login
              </button>
            )}
            {/* BECOME SELLER */}
            <button
              className="btn btn-primary seller-btn"
              onClick={() => navigate("/become-seller")}
            >
              <i className="bi bi-shop me-2"></i>
              Become Seller
            </button>
          </div>
        </div>
      </nav>

      {/* CATEGORY SHEET */}
      {showCategory && (
        <div
          className="category-sheet"
          onMouseLeave={() => setShowCategory(false)}
        >
          <CategorySheet selectedCategory={selectedCategory} />
        </div>
      )}
    </>
  );
};

export default Navbar;

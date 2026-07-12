import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Auth/authSlice";
import "../../css/sellersidebar/sellersidebar.css";

const SellerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menus = [
    { name: "Dashboard", path: "/seller", icon: "bi-speedometer2" },
    { name: "Orders", path: "/seller/orders", icon: "bi-bag-check" },
    { name: "Products", path: "/seller/products", icon: "bi-box-seam" },
    {
      name: "Add Product",
      path: "/seller/add-product",
      icon: "bi-plus-circle",
    },
    { name: "Payment", path: "/seller/payment", icon: "bi-credit-card" },
    { name: "Transaction", path: "/seller/transaction", icon: "bi-receipt" },
    { name: "Account", path: "/seller/account", icon: "bi-person-circle" },
  ];

  const handleSellerLogout = () => {
    dispatch(logout());
    navigate("/become-seller", { replace: true });
  };

  return (
    <aside className="seller-sidebar">
      <div className="seller-sidebar-header">
        <h4>Seller Panel</h4>
      </div>

      <div className="seller-sidebar-menu">
        {menus.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`seller-sidebar-link ${
                isActive ? "seller-active-link" : ""
              }`}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="seller-sidebar-bottom">
        <button
          type="button"
          className="seller-sidebar-link seller-logout-btn"
          onClick={handleSellerLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SellerSidebar;

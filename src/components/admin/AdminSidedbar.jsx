import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/adminAuth/adminAuthSlice";
import "../../css/admin/AdminSidebar.css";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // CLEAN SIDEBAR
  const menus = [
    { name: "Dashboard", path: "/admin", icon: "bi-speedometer2" },
    { name: "Coupons", path: "/admin/coupons", icon: "bi-ticket-perforated" },
    { name: "Add Coupon", path: "/admin/add-coupon", icon: "bi-plus-circle" },
    { name: "Home Category", path: "/admin/home-category", icon: "bi-house" },
    { name: "Deals", path: "/admin/deals", icon: "bi-tag-fill" },
    { name: "Sellers", path: "/admin/sellers", icon: "bi-shop" },
  ];

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h4 className="mb-0 text-white text-center">Admin Panel</h4>
      </div>

      <div className="admin-sidebar-menu">
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active-link" : ""
            }`}
          >
            <i className={`bi ${item.icon} me-3`} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="sidebar-bottom">
        <Link
          to="/admin/account"
          className={`sidebar-link ${
            location.pathname === "/admin/account" ? "active-link" : ""
          }`}
        >
          <i className="bi bi-person-circle me-3"></i>
          <span>Account</span>
        </Link>

        <button
          className="sidebar-link sidebar-logout-btn"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-3"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

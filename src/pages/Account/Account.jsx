import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const menu = [
  {
    name: "Orders",
    path: "/account/orders",
    icon: "bi bi-bag-check-fill",
  },

  {
    name: "Profile",
    path: "/account/profile",
    icon: "bi bi-person-fill",
  },

  {
    name: "Saved Cards",
    path: "/account/saved-cards",
    icon: "bi bi-credit-card-fill",
  },

  {
    name: "Addresses",
    path: "/account/addresses",
    icon: "bi bi-geo-alt-fill",
  },
];

const Account = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="container py-5">
      {/* <h2 className="fw-bold mb-4">{user?.fullName || "My Account"}</h2> */}
      <div className="mb-4">
        <h5 className="text-muted">Hello,</h5>
        <h2 className="fw-bold">{user?.fullName || user?.name}</h2>
      </div>
      <div className="row">
        <div className="col-lg-3 border-end">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`d-flex align-items-center gap-3 text-decoration-none px-4 py-3 rounded-3 mb-3
              ${
                location.pathname === item.path
                  ? "bg-success text-white"
                  : "text-dark border"
              }`}
            >
              <i className={item.icon}></i>

              {item.name}
            </Link>
          ))}
        </div>

        <div className="col-lg-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;

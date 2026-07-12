import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { adminLogin } from "../../redux/adminAuth/adminAuthThunk";
import { clearAdminAuthState } from "../../redux/adminAuth/adminAuthSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { loading, error, successMessage, isAuthenticated } = useSelector(
    (state) => state.adminAuth,
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const redirectPath = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  useEffect(() => {
    return () => {
      dispatch(clearAdminAuthState());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter email and password");
      return;
    }

    dispatch(
      adminLogin({
        email: form.email.trim(),
        password: form.password,
      }),
    );
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-5">
          <h3 className="text-center fw-bold mb-4">Admin Login</h3>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Admin Email"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>

            <button className="btn btn-dark w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

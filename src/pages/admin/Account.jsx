import { useSelector } from "react-redux";

const Account = () => {
  const { admin } = useSelector((state) => state.adminAuth);

  return (
    <div className="container-fluid">
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h4 className="mb-4">Admin Account</h4>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Admin Name</label>
              <input className="form-control" value="Admin" readOnly />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Role</label>
              <input
                className="form-control"
                value={admin?.role || "ROLE_ADMIN"}
                readOnly
              />
            </div>

            <div className="col-md-12">
              <label className="form-label fw-semibold">Email</label>
              <input
                className="form-control"
                value={admin?.email || "admin@gmail.com"}
                readOnly
              />
            </div>
          </div>

          <div className="mt-4">
            <button className="btn btn-secondary" disabled>
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

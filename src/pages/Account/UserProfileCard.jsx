import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/Auth/authThunk";

const UserProfileCard = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  if (loading && !user) {
    return (
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body p-4 text-center">Loading profile...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="alert alert-danger">
        {typeof error === "string"
          ? error
          : error?.message || "Failed to load profile"}
      </div>
    );
  }

  return (
    <div className="card border-0 shadow rounded-4 overflow-hidden">
      <div className="card-header bg-dark text-white py-3">
        <h4 className="mb-0">
          <i className="bi bi-person-circle me-2"></i>
          My Profile
        </h4>
      </div>

      <div className="card-body p-4">
        <div className="row align-items-center border-bottom py-3">
          <div className="col-md-4 fw-semibold">
            <i className="bi bi-person me-2 text-primary"></i>
            Full Name
          </div>
          <div className="col-md-8">{user?.fullName || "-"}</div>
        </div>

        <div className="row align-items-center border-bottom py-3">
          <div className="col-md-4 fw-semibold">
            <i className="bi bi-envelope me-2 text-primary"></i>
            Email
          </div>
          <div className="col-md-8">{user?.email || "-"}</div>
        </div>

        <div className="row align-items-center py-3">
          <div className="col-md-4 fw-semibold">
            <i className="bi bi-telephone me-2 text-primary"></i>
            Mobile
          </div>
          <div className="col-md-8">{user?.phoneNumber || "-"}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;

import AdminSidebar from "../../components/admin/AdminSidedbar";

import AdminRoutes from "../../routes/AdminRoutes";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row g-0">
        <div className="col-lg-3 col-md-4">
          <AdminSidebar />
        </div>

        <div className="col-lg-9 col-md-8 p-4">
          <AdminRoutes />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

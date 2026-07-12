import SellerSidebar from "../../components/seller/SellerSidebar";
import SellerRoutes from "../../routes/SellerRoutes";
import "../../css/sellersidebar/sellersidebar.css";

const SellerDashboard = () => {
  return (
    <div className="seller-dashboard-layout">
      <SellerSidebar />

      <main className="seller-dashboard-main">
        <SellerRoutes />
      </main>
    </div>
  );
};

export default SellerDashboard;

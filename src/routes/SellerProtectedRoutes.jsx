import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const { jwt } = useSelector((state) => state.seller);

  const sellerJwt = jwt || localStorage.getItem("seller_jwt");

  if (!sellerJwt) {
    return <Navigate to="/become-seller" replace />;
  }

  return children;
};

export default SellerProtectedRoute;

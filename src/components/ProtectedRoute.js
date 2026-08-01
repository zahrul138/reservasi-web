import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    // Redirect ke signin DAN kirim info asal route
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole = "" }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();

  // Hiển thị loading nếu đang kiểm tra trạng thái đăng nhập
  if (loading) {
    return <div>Đang tải...</div>;
  }

  // Kiểm tra xác thực
  if (!isAuthenticated) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  // Kiểm tra quyền (nếu có yêu cầu)
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

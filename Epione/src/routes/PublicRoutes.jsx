import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";

import ProductPage from "../pages/products/ProductPage";
import ProductDetailPage from "../pages/products/ProductDetailPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";

import AdminDashboard from "../pages/admin/Dashboard";
import Profile from "../pages/Profile";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
      <Route path="/collections/:type" element={<ProductPage />} />
      <Route path="/account/login" element={<Login />} />
      <Route path="/account/register" element={<Register />} />
      <Route path="/account/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/account/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;

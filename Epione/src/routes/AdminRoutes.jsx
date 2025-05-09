import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import ProductTable from "../pages/admin/ProductTable";
import UserManagement from "../pages/admin/UserManagement";
import OrderManagement from "../pages/admin/OrderManagement";
import { AdminProvider } from "../context/AdminContext";

const AdminRoutes = () => (
  <AdminProvider>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="products" element={<ProductTable />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="orders" element={<OrderManagement />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  </AdminProvider>
);

export default AdminRoutes;

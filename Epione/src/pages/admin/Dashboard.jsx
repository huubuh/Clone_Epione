import React from "react";
import { Card, Row, Col, Statistic, Spin, Alert } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const Dashboard = () => {
  const { products, users, orders, loading } = useAdmin();

  const safeProducts = Array.isArray(products) ? products : [];
  const safeUsers = Array.isArray(users) ? users : [];
  const safeOrders = Array.isArray(orders) ? orders : [];

  // Tính tổng doanh thu từ tất cả các đơn hàng
  const totalRevenue = safeOrders.reduce((total, order) => {
    return total + (typeof order.total === "number" ? order.total : 0);
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (!safeProducts.length && !safeUsers.length && !safeOrders.length) {
    return (
      <div className="p-6">
        <Alert
          message="Không có dữ liệu hoặc lỗi kết nối đến server."
          description="Vui lòng kiểm tra lại kết nối hoặc khởi động lại server dữ liệu (json-server)."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng sản phẩm"
              value={safeProducts.length}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={safeOrders.length}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng người dùng"
              value={safeUsers.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              precision={0}
              formatter={(value) => `${value.toLocaleString("vi-VN")}đ`}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={8}>
          <Link to="/admin/products">
            <Card hoverable className="h-full">
              <div className="text-center">
                <ShoppingOutlined className="text-4xl mb-4" />
                <h3 className="text-lg font-semibold">Quản lý sản phẩm</h3>
                <p className="text-gray-600">Quản lý danh mục sản phẩm</p>
              </div>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={8}>
          <Link to="/admin/orders">
            <Card hoverable className="h-full">
              <div className="text-center">
                <ShoppingCartOutlined className="text-4xl mb-4" />
                <h3 className="text-lg font-semibold">Quản lý đơn hàng</h3>
                <p className="text-gray-600">Xem và quản lý đơn hàng</p>
              </div>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={8}>
          <Link to="/admin/users">
            <Card hoverable className="h-full">
              <div className="text-center">
                <UserOutlined className="text-4xl mb-4" />
                <h3 className="text-lg font-semibold">Quản lý người dùng</h3>
                <p className="text-gray-600">Quản lý tài khoản người dùng</p>
              </div>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

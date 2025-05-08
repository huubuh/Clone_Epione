import React from "react";
import { Card, Col, Row, Statistic, Button } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Row gutter={16} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng đơn hàng"
              value={125}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Người dùng mới"
              value={42}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Doanh thu tháng này"
              value={15200000}
              prefix={<DollarOutlined />}
              suffix="VND"
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sản phẩm"
              value={85}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} lg={16} className="mb-6">
          <Card
            title="Đơn hàng gần đây"
            extra={<Button type="link">Xem tất cả</Button>}
          >
            <p>Danh sách các đơn hàng gần đây sẽ hiển thị ở đây...</p>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Sản phẩm bán chạy"
            extra={<Button type="link">Xem tất cả</Button>}
          >
            <p>Danh sách các sản phẩm bán chạy sẽ hiển thị ở đây...</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;

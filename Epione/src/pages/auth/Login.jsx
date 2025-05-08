import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = async (values) => {
    try {
      console.log("Bắt đầu đăng nhập với:", values);
      setLoading(true);

      // Gửi yêu cầu đến json-server để tìm người dùng theo email
      const response = await axios.get(
        `http://localhost:3000/users?email=${values.email}`
      );
      console.log("Response từ server:", response.data);

      const users = response.data;

      // Kiểm tra xem có người dùng nào khớp với email không
      if (users.length === 0) {
        console.log("Không tìm thấy email");
        message.error("Email không tồn tại trong hệ thống!");
        return;
      }

      const user = users[0];
      console.log("Tìm thấy user:", user);

      // So sánh mật khẩu
      if (user.password !== values.password) {
        console.log("Mật khẩu không khớp");
        message.error("Mật khẩu không đúng!");
        return;
      }

      // Lưu trạng thái đăng nhập
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userEmail", values.email);
      // Cập nhật AuthContext
      login(user.role);

      message.success("Đăng nhập thành công!");
      navigate(user.role === "admin" ? "/admin/dashboard" : "/account/profile");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      message.error("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Đăng nhập</h1>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <div className="mb-4">
              <Link
                to="/account/forgot-password"
                className="text-[#1106a7] hover:text-[#1106a7]"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#1106a7] hover:bg-[#1106a7]"
                loading={loading}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <span>Chưa có tài khoản? </span>
            <Link
              to="/account/register"
              className="text-[#1106a7] hover:text-[#1106a7]"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

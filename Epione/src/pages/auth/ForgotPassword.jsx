import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import axios from "axios";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Kiểm tra email có tồn tại không
      const response = await axios.get(
        `http://localhost:3000/users?email=${values.email}`
      );

      if (response.data.length === 0) {
        throw new Error("Email không tồn tại trong hệ thống!");
      }

      // Giả lập gửi email khôi phục mật khẩu
      console.log("Gửi email khôi phục mật khẩu đến:", values.email);

      setEmailSent(true);
      message.success(
        "Hướng dẫn khôi phục mật khẩu đã được gửi đến email của bạn!"
      );
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Quên mật khẩu</h1>

          {emailSent ? (
            <div className="text-center">
              <p className="mb-4">
                Hướng dẫn khôi phục mật khẩu đã được gửi đến email của bạn.
              </p>
              <p className="mb-4">
                Vui lòng kiểm tra hộp thư đến (và thư rác nếu cần).
              </p>
              <Link
                to="/account/login"
                className="text-blue-500 hover:text-blue-700"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          ) : (
            <Form
              name="forgotPassword"
              onFinish={onFinish}
              layout="vertical"
              size="large"
            >
              <p className="mb-4">
                Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật
                khẩu.
              </p>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  loading={loading}
                >
                  Gửi
                </Button>
              </Form.Item>

              <div className="text-center mt-4">
                <Link
                  to="/account/login"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Quay lại đăng nhập
                </Link>
              </div>
            </Form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;

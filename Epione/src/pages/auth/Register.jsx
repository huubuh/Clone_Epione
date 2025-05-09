import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const checkResponse = await axios.get(
        `http://localhost:3000/users?email=${values.email}`
      );
      if (checkResponse.data.length > 0) {
        throw new Error("Email đã được sử dụng!");
      }

      const newUser = {
        id: Date.now().toString(),
        email: values.email,
        password: values.password,
        role: "user",
        username: values.username,
        lastName: values.lastName,
      };

      await axios.post("http://localhost:3000/users", newUser);

      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/");
    } catch (error) {
      message.error(error.message || "Đăng ký thất bại. Vui lòng thử lại!");
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
          <h1 className="text-2xl font-bold text-center mb-6">
            Đăng ký tài khoản
          </h1>

          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              label="Tên tài khoản"
              rules={[
                { required: true, message: "Vui lòng nhập tên tài khoản!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Họ của bạn"
              rules={[{ required: true, message: "Vui lòng nhập họ của bạn!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Họ" />
            </Form.Item>

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

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Hai mật khẩu không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#1106a7] hover:bg-[#1106a7]"
                loading={loading}
              >
                Tạo tài khoản
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <span>Đã có tài khoản? </span>
            <Link
              to="/account/login"
              className="text-[#1106a7] hover:text-[#1106a7]"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Descriptions,
  message,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  List,
  Divider,
} from "antd";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm] = Form.useForm();
  const [addressLoading, setAddressLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log("Fetching user info...");
        const email = localStorage.getItem("userEmail");
        console.log("userEmail from localStorage:", email);

        if (!email) {
          throw new Error("Vui lòng đăng nhập lại!");
        }

        const response = await axios.get(
          `http://localhost:3000/users?email=${email}`
        );
        console.log("API response:", response.data);

        if (response.data.length === 0) {
          throw new Error("Người dùng không tồn tại!");
        }

        setUserInfo(response.data[0]);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError(error.message || "Lỗi khi tải thông tin người dùng!");
        message.error(error.message || "Lỗi khi tải thông tin người dùng!");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/account/login");
  };

  // Thêm địa chỉ mới
  const handleAddAddress = async (values) => {
    setAddressLoading(true);
    try {
      const newAddress = { ...values, id: Date.now().toString() };
      const updatedAddresses = userInfo.addresses
        ? [...userInfo.addresses, newAddress]
        : [newAddress];

      await axios.patch(`http://localhost:3000/users/${userInfo.id}`, {
        addresses: updatedAddresses,
      });
      setUserInfo({ ...userInfo, addresses: updatedAddresses });
      setShowAddressModal(false);
      addressForm.resetFields();
      message.success("Thêm địa chỉ thành công!");
    } catch {
      message.error("Lỗi khi thêm địa chỉ!");
    } finally {
      setAddressLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Không tìm thấy thông tin người dùng!
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-6">
        <Card
          title="Thông tin cá nhân"
          style={{ maxWidth: 600, margin: "0 auto" }}
          extra={
            <Button type="primary" danger onClick={handleLogout}>
              Đăng xuất
            </Button>
          }
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Email">
              {userInfo.email}
            </Descriptions.Item>
            <Descriptions.Item label="Tên tài khoản">
              {userInfo.username}
            </Descriptions.Item>
            <Descriptions.Item label="Họ">
              {userInfo.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Vai trò">
              {userInfo.role}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {userInfo.role !== "admin" && (
          <div style={{ maxWidth: 600, margin: "24px auto 0" }}>
            <Divider orientation="left">Địa chỉ</Divider>
            <Button
              type="primary"
              onClick={() => setShowAddressModal(true)}
              style={{ marginBottom: 16 }}
            >
              Thêm địa chỉ mới
            </Button>
            <List
              bordered
              dataSource={userInfo.addresses || []}
              locale={{ emptyText: "Chưa có địa chỉ nào" }}
              renderItem={(item) => (
                <List.Item>
                  <div>
                    <b>
                      {item.firstName} {item.lastName}
                    </b>
                    {item.isDefault && (
                      <span style={{ color: "#1890ff" }}>(Mặc định)</span>
                    )}
                    <br />
                    {item.address}, {item.apartment && `${item.apartment}, `}
                    {item.city}, {item.country}
                    <br />
                    {item.phone}
                  </div>
                </List.Item>
              )}
            />

            <Modal
              title="Thêm địa chỉ mới"
              open={showAddressModal}
              onCancel={() => setShowAddressModal(false)}
              footer={null}
            >
              <Form
                form={addressForm}
                layout="vertical"
                onFinish={handleAddAddress}
              >
                <Form.Item
                  name="firstName"
                  label="Tên"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input placeholder="Tên" />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Họ"
                  rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                >
                  <Input placeholder="Họ" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Địa chỉ"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item
                  name="apartment"
                  label="Căn hộ, phòng, v.v. (không bắt buộc)"
                >
                  <Input placeholder="Căn hộ, phòng, v.v. (không bắt buộc)" />
                </Form.Item>
                <Form.Item
                  name="city"
                  label="Thành phố"
                  rules={[
                    { required: true, message: "Vui lòng nhập thành phố!" },
                  ]}
                >
                  <Input placeholder="Thành phố" />
                </Form.Item>
                <Form.Item
                  name="country"
                  label="Quốc gia/khu vực"
                  rules={[
                    { required: true, message: "Vui lòng chọn quốc gia!" },
                  ]}
                >
                  <Select placeholder="---">
                    <Select.Option value="Việt Nam">Việt Nam</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^[0-9]{9,11}$/,
                      message: "Số điện thoại không hợp lệ!",
                    },
                  ]}
                >
                  <Input placeholder="Điện thoại" />
                </Form.Item>
                <Form.Item name="isDefault" valuePropName="checked">
                  <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={addressLoading}
                    style={{ width: "100%" }}
                  >
                    Thêm địa chỉ
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            <Divider orientation="left">Lịch sử đơn hàng</Divider>
            <List
              bordered
              dataSource={userInfo.orders || []}
              locale={{ emptyText: "Chưa có đơn hàng nào" }}
              renderItem={(order) => (
                <List.Item>
                  <div>
                    <b>Mã đơn:</b> {order.id} <br />
                    <b>Ngày đặt:</b> {order.date} <br />
                    <b>Tổng tiền:</b> {order.total} <br />
                  </div>
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;

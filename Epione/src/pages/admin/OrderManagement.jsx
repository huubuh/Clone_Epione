import React, { useState } from "react";
import { Table, Button, Modal, Descriptions, Tag } from "antd";
import { useAdmin } from "../../context/AdminContext";

const OrderManagement = () => {
  const { orders } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showOrderDetails(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Chi tiết đơn hàng"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <Descriptions title="Thông tin khách hàng" bordered>
              <Descriptions.Item label="Tên">
                {selectedOrder.userName}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedOrder.userEmail}
              </Descriptions.Item>
            </Descriptions>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Sản phẩm đã đặt</h3>
              <Table
                dataSource={selectedOrder.items}
                rowKey="id"
                pagination={false}
                columns={[
                  {
                    title: "Sản phẩm",
                    dataIndex: "name",
                    key: "name",
                    render: (text, record) => (
                      <div className="flex items-center">
                        <img
                          src={record.image}
                          alt={text}
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <span>{text}</span>
                      </div>
                    ),
                  },
                  {
                    title: "Số lượng",
                    dataIndex: "quantity",
                    key: "quantity",
                  },
                  {
                    title: "Đơn giá",
                    dataIndex: "price",
                    key: "price",
                    render: (price) => `${price.toLocaleString("vi-VN")}đ`,
                  },
                  {
                    title: "Thành tiền",
                    key: "subtotal",
                    render: (_, record) =>
                      `${(record.price * record.quantity).toLocaleString(
                        "vi-VN"
                      )}đ`,
                  },
                ]}
              />
            </div>

            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">
                Tổng tiền:{" "}
                <span className="text-red-500">
                  {selectedOrder.total.toLocaleString("vi-VN")}đ
                </span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;

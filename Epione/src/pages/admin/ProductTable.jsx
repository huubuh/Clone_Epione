import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";

const ProductTable = () => {
  const { products, deleteProduct } = useAdmin();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Failed to delete product");
      console.error("lỗi", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          to={`/admin/products/${record.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => {
        if (record.variants) {
          return record.variants.reduce(
            (total, variant) => total + variant.quantity,
            0
          );
        }
        return quantity || 0;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => `${rating}/5`,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/products/edit/${record.type}`}>
            <Button type="primary" icon={<EditOutlined />}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Link to="/admin/products/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ProductTable;

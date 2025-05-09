import React, { useState } from "react";
import { Table, Button, Space, Popconfirm, Tag, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAdmin } from "../../context/AdminContext";

const UserManagement = () => {
  const { users, updateUserRole, deleteUser } = useAdmin();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleDelete = async (id) => {
    try {
      const userToDelete = users.find((u) => u.id === id);
      if (userToDelete.role === "admin") {
        message.error("Không thể xóa tài khoản admin");
        return;
      }
      await deleteUser(id);
      message.success("Xóa người dùng thành công");
    } catch (error) {
      message.error("Không thể xóa người dùng");
      console.log("Lỗi", error);
    }
  };

  const handleUpdateRole = async (id, role) => {
    try {
      const userToUpdate = users.find((u) => u.id === id);
      // Kiểm tra nếu đây là admin cuối cùng
      if (userToUpdate.role === "admin" && role === "user") {
        const adminCount = users.filter((u) => u.role === "admin").length;
        if (adminCount <= 1) {
          message.error("Không thể chuyển đổi vai trò của admin cuối cùng");
          return;
        }
      }
      await updateUserRole(id, role);
      message.success("Cập nhật vai trò thành công");
    } catch (error) {
      message.error("Không thể cập nhật vai trò");
      console.log("Lỗi", error);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title={`Bạn có chắc muốn chuyển người dùng này thành ${
              record.role === "admin" ? "người dùng thường" : "admin"
            }?`}
            onConfirm={() =>
              handleUpdateRole(
                record.id,
                record.role === "admin" ? "user" : "admin"
              )
            }
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" icon={<EditOutlined />}>
              Đổi vai trò
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
            disabled={record.role === "admin"}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={record.role === "admin"}
            >
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
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UserManagement;

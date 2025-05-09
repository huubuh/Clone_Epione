import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [chairsRes, desksRes, accessoriesRes, usersRes] =
          await Promise.all([
            axios.get("http://localhost:3000/chairs"),
            axios.get("http://localhost:3000/desks"),
            axios.get("http://localhost:3000/accessories"),
            axios.get("http://localhost:3000/users"),
          ]);

        const allProducts = [
          ...chairsRes.data.map((p) => ({ ...p, type: "chair" })),
          ...desksRes.data.map((p) => ({ ...p, type: "desk" })),
          ...accessoriesRes.data.map((p) => ({ ...p, type: "accessory" })),
        ];

        /* gom đơn hàng bên trong users thành mảng phẳng */
        const allOrders = usersRes.data.flatMap((u) =>
          (u.orders || []).map((o) => ({
            ...o,
            userId: u.id,
            userEmail: u.email,
            userName: `${u.username} ${u.lastName}`,
          }))
        );

        setProducts(allProducts);
        setUsers(usersRes.data);
        setOrders(allOrders);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const deleteProduct = async (id, type) => {
    try {
      await axios.delete(`http://localhost:3000/${type}s/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Delete product failed", e);
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      const user = users.find((u) => u.id === id);
      if (!user) return;
      const { data } = await axios.put(`http://localhost:3000/users/${id}`, {
        ...user,
        role,
      });
      setUsers((prev) => prev.map((u) => (u.id === id ? data : u)));
      return data;
    } catch (e) {
      console.error("Update role failed", e);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      console.error("Delete user failed", e);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    const user = users.find((u) => u.orders?.some((o) => o.id === orderId));
    if (!user) return;
    const updatedOrders = user.orders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    );
    const { data } = await axios.put(`http://localhost:3000/users/${user.id}`, {
      ...user,
      orders: updatedOrders,
    });

    setUsers((prev) => prev.map((u) => (u.id === user.id ? data : u)));
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    return data;
  };

  const value = {
    products,
    users,
    orders,
    loading,
    deleteProduct,
    updateUserRole,
    deleteUser,
    updateOrderStatus,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContext;

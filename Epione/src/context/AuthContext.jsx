import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      const role = localStorage.getItem("userRole") || "";

      if (authStatus && role) {
        try {
          // Kiểm tra xem vai trò có hợp lệ trong db.json không
          const response = await axios.get(
            `http://localhost:3000/users?role=${role}`
          );
          if (response.data.length > 0) {
            setIsAuthenticated(true);
            setUserRole(role);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Lỗi khi kiểm tra người dùng:", error);
          handleLogout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (role) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUserRole("");

    setLoading(false);
  };

  const value = {
    isAuthenticated,
    userRole,
    loading,
    login,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

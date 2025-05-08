import { useEffect, useState } from "react";
import Logo from "../assets/images/Logo.avif";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Dropdown, Avatar, Badge } from "antd";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import { getAllProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import axios from "axios";
import CartDrawer from "./CartDrawer";

const navItems = [
  { label: "Ghế công thái học", path: "/collections/chairs" },
  { label: "Bàn Epione", path: "/collections/desks" },
  { label: "Phụ kiện", path: "/collections/accessories" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { cartCount } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const all = await getAllProducts();
      setProducts(all);
    };
    fetchProducts();
  }, []);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Kiểm tra trạng thái đăng nhập khi component được render
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("userRole") || "";

    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, []);

  // Lấy userInfo khi đăng nhập
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      axios.get(`http://localhost:3000/users?email=${email}`).then((res) => {
        if (res.data.length > 0) setUserInfo(res.data[0]);
      });
    }
  }, [isAuthenticated]);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenuItems = [
    ...(userRole !== "admin"
      ? [
          {
            key: "profile",
            label: "Thông tin cá nhân",
            icon: <UserOutlined />,
            onClick: () => navigate("/account/profile"),
          },
        ]
      : []),
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  if (userRole === "admin") {
    userMenuItems.unshift({
      key: "dashboard",
      label: "Admin Dashboard",
      icon: <DashboardOutlined />,
      onClick: () => navigate("/admin/dashboard"),
    });
  }

  const headerClass =
    "bg-white shadow-sm sticky top-0 z-50 transition-all duration-300";
  const innerClass =
    "container mx-auto flex justify-between items-center px-6 py-4 min-h-[64px]";

  return (
    <header className={headerClass}>
      <div className={innerClass}>
        <Link to="/" className="flex items-center h-full w-[300px]">
          <img
            src={Logo}
            alt="Epione Logo"
            className={`object-contain transition-all duration-300
      ${isScrolled ? "w-[90px] h-[26px]" : "w-[120px] h-[35px]"}`}
          />
        </Link>

        <nav>
          <ul className="flex gap-6 font-medium text-gray-700">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-4 py-2 transition-colors font-medium ${
                      isActive
                        ? "text-[#1106a7] border-b-2 border-[#1106a7] pb-1"
                        : "text-gray-700 hover:text-[#1106a7] hover:bg-blue-100 rounded-2xl"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <SearchBar products={products} />

          {isAuthenticated ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <Avatar
                icon={<UserOutlined />}
                className="cursor-pointer bg-[#1106a7] hover:opacity-80"
              />
            </Dropdown>
          ) : (
            <UserOutlined
              className="text-xl cursor-pointer hover:text-[#1106a7]"
              onClick={() => navigate("/account/login")}
            />
          )}

          <Badge count={cartCount} size="small" offset={[0, 2]}>
            <ShoppingCartOutlined
              className="text-xl cursor-pointer hover:text-[#1106a7]"
              onClick={() => setDrawerOpen(true)}
            />
          </Badge>
          <CartDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </div>
      </div>
    </header>
  );
};

export default NavBar;

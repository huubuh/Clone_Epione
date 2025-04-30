// src/components/NavBar.jsx
import Logo from "../assets/images/Logo.avif";
import { Link, NavLink } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const NavBar = () => {
  const navItems = [
    { label: "Ghế công thái học", path: "/chairs" },
    { label: "Bàn Epione", path: "/desks" },
    { label: "Phụ kiện", path: "/accessories" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <img
            src={Logo}
            alt="Epione Logo"
            className="w-[120px] h-[35px] object-contain"
          />
        </Link>
        <nav>
          <ul className="flex gap-6 font-medium text-gray-700">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    "px-4 py-2  transition-colors font-medium " +
                    (isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1 "
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-100 rounded-2xl")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          {/* Tìm kiếm */}
          <div className="relative w-[250px]">
            <input
              type="text"
              className="w-full border rounded-xl pl-10 py-1 pr-3 outline-none "
              placeholder="Tìm kiếm..."
            />
            <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <UserOutlined className="text-xl cursor-pointer hover:text-blue-600" />
          <ShoppingCartOutlined className="text-xl cursor-pointer hover:text-blue-600" />
        </div>
      </div>
    </header>
  );
};

export default NavBar;

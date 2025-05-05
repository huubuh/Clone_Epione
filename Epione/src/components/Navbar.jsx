import { useEffect, useState } from "react";
import Logo from "../assets/images/Logo.avif";
import { Link, NavLink } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const navItems = [
  { label: "Ghế công thái học", path: "/collections/chairs" },
  { label: "Bàn Epione", path: "/collections/desks" },
  { label: "Phụ kiện", path: "/collections/accessories" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                        ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-100 rounded-2xl"
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
          <div className="relative w-[250px]">
            <input
              type="text"
              className="w-full border rounded-xl pl-10 py-1 pr-3 outline-none"
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

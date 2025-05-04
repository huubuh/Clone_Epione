import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import chairImg from "../../assets/images/collection-ghe-cong-thai-hoc.webp";
import deskImg from "../../assets/images/collection-ban-nang-ha.webp";
import accessoriesImg from "../../assets/images/collection-phu-kien-setup.webp";

const API = "http://localhost:3000"; // base của JSON-Server

const CategoryList = () => {
  /* state lưu số lượng */
  const [count, setCount] = useState({ chairs: 0, desks: 0, accessories: 0 });
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(null);

  /* gọi API một lần khi mount */
  useEffect(() => {
    Promise.all([
      axios.get(`${API}/chairs`),
      axios.get(`${API}/desks`),
      axios.get(`${API}/accessories`),
    ])
      .then(([chairs, desks, accessories]) =>
        setCount({
          chairs: chairs.data.length,
          desks: desks.data.length,
          accessories: accessories.data.length,
        })
      )
      .catch(() => setError("Không lấy được dữ liệu danh mục"))
      .finally(() => setLoad(false));
  }, []);

  /* cấu hình danh mục */
  const categories = [
    {
      key: "chairs",
      title: "Ghế công thái học",
      image: chairImg,
      path: "/products/chairs",
    },
    {
      key: "desks",
      title: "Bàn nâng hạ",
      image: deskImg,
      path: "/products/desks",
    },
    {
      key: "accessories",
      title: "Phụ kiện setup",
      image: accessoriesImg,
      path: "/products/accessories",
    },
  ];

  return (
    <section className="py-10">
      <h1 className="text-4xl font-semibold text-center mb-6">
        Danh mục sản phẩm
      </h1>

      {loading && <p className="text-center py-6 text-gray-500">Đang tải…</p>}
      {error && <p className="text-center py-6 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {categories.map((cat) => (
            <Link to={cat.path} key={cat.key} className="rounded-xl">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-auto hover:brightness-110 rounded-xl"
              />
              <div className="text-center mt-2">
                <h3 className="text-[#1106a7] font-bold">{cat.title}</h3>
                <p className="text-sm text-gray-500">
                  {count[cat.key]} sản phẩm
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryList;

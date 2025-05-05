import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import chairImg from "../../assets/images/collection-ghe-cong-thai-hoc.webp";
import deskImg from "../../assets/images/collection-ban-nang-ha.webp";
import accessoriesImg from "../../assets/images/collection-phu-kien-setup.webp";
import { getCategoryCounts } from "../../services/productService";

const CategoryList = () => {
  /* state lưu số lượng */
  const [count, setCount] = useState({ chairs: 0, desks: 0, accessories: 0 });
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await getCategoryCounts();
        setCount(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoad(false);
      }
    };

    fetchCounts();
  }, []);

  /* cấu hình danh mục */
  const categories = [
    {
      key: "chairs",
      title: "Ghế công thái học",
      image: chairImg,
      path: "/collections/chairs",
    },
    {
      key: "desks",
      title: "Bàn nâng hạ",
      image: deskImg,
      path: "/collections/desks",
    },
    {
      key: "accessories",
      title: "Phụ kiện setup",
      image: accessoriesImg,
      path: "/collections/accessories",
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

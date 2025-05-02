// src/pages/home/CategoryList.jsx
import { Link } from "react-router-dom";
import chairImg from "../../assets/images/collection-ghe-cong-thai-hoc.webp";
import deskImg from "../../assets/images/collection-ban-nang-ha.webp";
import accessoriesImg from "../../assets/images/collection-phu-kien-setup.webp";

const categories = [
  {
    title: "Ghế công thái học",
    count: 5,
    image: chairImg,
    path: "/chairs",
  },
  {
    title: "Bàn nâng hạ",
    count: 5,
    image: deskImg,
    path: "/desks",
  },
  {
    title: "Phụ kiện setup",
    count: 13,
    image: accessoriesImg,
    path: "/accessories",
  },
];

const CategoryList = () => {
  return (
    <section className="py-10">
      <h1 className="text-4xl font-semibold text-center mb-6">
        Danh mục sản phẩm
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {categories.map((category, idx) => (
          <Link to={category.path} key={idx} className=" rounded-xl ">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-auto  hover:brightness-110"
            />
            <div className="text-center mt-2">
              <h3 className="text-[#1106a7] font-bold">{category.title}</h3>
              <p className="text-sm text-gray-500">{category.count} sản phẩm</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;

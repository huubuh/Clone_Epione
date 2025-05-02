import ProductCard from "../../components/ProductCard";
import Button from "../../components/ui/Button";
import { ArrowRightOutlined } from "@ant-design/icons";

const BestSellers = () => {
  const products = [
    {
      id: 1,
      name: "Ghế công thái học Epione ElysChair",
      image: "src/assets/images/ghe-cong-thai-hoc-epione-elyschair-125084.webp",
      price: 2390000,
      rating: 5,
    },
    {
      id: 2,
      name: "Ghế công thái học Epione EasyChair 2.0",
      image:
        "src/assets/images/ghe-cong-thai-hoc-epione-easychair-20-582610.webp",
      price: 6690000,
      rating: 5,
    },
    {
      id: 3,
      name: "Bàn nâng hạ Epione SmartDesk Lite 2.0",
      image: "src/assets/images/smartdesk-lite-2.0-corner-white.webp",
      price: 5990000,
      rating: 5,
    },
    {
      id: 4,
      name: "Tấm lót bàn Epione Essentials Pad",
      image: "src/assets/images/tam-lot-ban-epione-essentials-pad-213616.webp",
      price: 790000,
      rating: "Chưa có đánh giá",
    },
    {
      id: 5,
      name: "Giá đỡ màn hình Epione Essentials Arm",
      image:
        "src/assets/images/tay-nang-man-hinh-epione-essentials-arm-453546.webp",
      price: 790000,
      rating: 5,
    },
  ];
  return (
    <section className="py-10 text-center">
      <h2 className="text-4xl font-semibold text-center mb-6">
        Epione Best Sellers
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <Button className="mt-4 cursor-pointer" icon={<ArrowRightOutlined />}>
        Xem tất cả
      </Button>
    </section>
  );
};

export default BestSellers;

import { CheckOutlined } from "@ant-design/icons";
import RatingStars from "./RatingStars";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const rating = typeof product.rating === "string" ? 0 : product.rating;

  return (
    <Link to={`/products/${product.slug}`} className="block">
      <div className="border-[#e5e5e5] rounded-xl shadow-sm hover:shadow-md transition bg-white text-left cursor-pointer group overflow-hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain rounded-t-xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
          />
        </div>
        <div className="p-4">
          <div className="border-b border-b-gray-200 p-2">
            {rating > 0 ? (
              <RatingStars rating={rating} />
            ) : (
              <p className="text-gray-500 text-[10px]">Chưa có đánh giá</p>
            )}
          </div>
        </div>
        <div className="px-4 pb-4">
          <p className="font-semibold text-[#1106a7] mt-2 hover:underline leading-snug">
            {product.name}
          </p>
          <p className="text-lg font-semibold text-[#1106a7] mt-1">
            {product.price.toLocaleString()} VND
          </p>
          <div className="flex items-center gap-4 mt-2">
            {product.quantity > 0 ? (
              <p className="text-green-700 text-[10px] flex items-center gap-1">
                <CheckOutlined />
                <span className="text-[10px]">Còn hàng</span>
              </p>
            ) : (
              <p className="text-red-600 text-[10px]">Hết hàng</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import { CheckOutlined } from "@ant-design/icons";
import RatingStars from "./RatingStars"; // Đảm bảo bạn đã import đúng path

const ProductCard = ({ product }) => {
  return (
    <div className="border-[#e5e5e5] rounded-xl  shadow-sm hover:shadow-md transition bg-white text-left cursor-pointer group overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain rounded-t-xl  transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
        />
      </div>
      <div className="p-4 ">
        <div className="border-b border-b-gray-200 p-2">
          <RatingStars rating={product.rating || 0} />
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="font-semibold text-[#1106a7] mt-2 hover:underline  leading-snug">
          {product.name}
        </p>
        <p className="text-lg font-semibold text-[#1106a7] mt-1">
          {product.price.toLocaleString()} VND
        </p>
        <div className="flex  items-center gap-4 mt-2">
          <p className="text-green-700 text-[10px]  flex items-center gap-1">
            <CheckOutlined />
          </p>
          <p className="text-[10px]"> Còn hàng</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

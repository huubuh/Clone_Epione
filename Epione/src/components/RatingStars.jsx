import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";

const RatingStars = ({ rating }) => {
  // Nếu rating không phải là số (ví dụ: "chưa có đánh giá"), thì hiển thị thông báo
  if (typeof rating !== "number") {
    return <p className="text-[9px] font-semibold text-gray-500 ">{rating}</p>;
  }

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5 text-[10px] ">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <StarFilled key={i} style={{ color: "#facc15" }} />;
        } else if (i === fullStars && hasHalf) {
          return <StarTwoTone twoToneColor="#facc15" key={i} />;
        } else {
          return <StarOutlined key={i} className="text-gray-300" />;
        }
      })}
    </div>
  );
};

export default RatingStars;

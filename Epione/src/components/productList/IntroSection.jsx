import { useState, useEffect } from "react";
import deskImg from "../../assets/images/tham-quan-nha-may-epione.webp";
import chairImg from "../../assets/images/ghe-cong-thai-hoc-epione-video.jpg";

const IntroSection = ({ type }) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(false);
  }, [type]);

  if (type === "accessories") return null;

  const introContent = {
    chairs: {
      title: "Ghế công thái học",
      image: chairImg,
      video: "https://www.youtube.com/embed/9PdysXHiLFk",
      description:
        "Khám phá ghế công thái học Epione với thiết kế thông minh, hỗ trợ cột sống, mang đến sự thoải mái. Lựa chọn hoàn hảo cho dân văn phòng và làm việc tại nhà! Ghế Epione cũng giúp tăng sự thoải mái, chất lượng sức khỏe với các mẫu ghế văn phòng khác nhau ưu điểm của các mẫu ghế: khả năng linh hoạt... đây là sản phẩm không thể thiếu cho không gian làm việc chuyên nghiệp sử dụng đồ nội thất hiện đại, ghế công thái học.",
    },
    desks: {
      title: "Bàn nâng hạ",
      image: deskImg,
      video: "https://www.youtube.com/embed/T97EY3Bw2tI",
      description:
        "Sản phẩm hướng tới sự tiện nghi, tạo nên góc làm việc, học tập cao cấp với mức giá hợp lý.",
    },
  }[type];

  if (!introContent) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-4xl font-semibold mb-5 mt-10 text-center">
        {introContent.title}
      </h2>
      <div className="relative max-w-4xl mx-auto aspect-video ">
        {showVideo ? (
          // Hiển thị video khi bấm nút Play
          <iframe
            src={`${introContent.video}?autoplay=1`}
            title={`${introContent.title} Video`}
            className=" w-full h-full rounded-xl shadow-md" // Đảm bảo lấp đầy container
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Hiển thị hình ảnh ban đầu
          <>
            <img
              src={introContent.image}
              alt={`${introContent.title} Video Thumbnail`}
              className=" w-full h-full object-cover rounded-xl shadow-md" // Đảm bảo lấp đầy container
            />
            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors">
                <svg
                  className="w-8 h-8 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
      <p className="text-gray-600 max-w-4xl mt-4 text-center mx-auto">
        {introContent.description}
      </p>
    </section>
  );
};

export default IntroSection;

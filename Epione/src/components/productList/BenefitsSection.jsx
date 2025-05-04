import chairImage from "../../assets/images/loi-ich-ghe-cong-thai-hoc.webp";
import deskImage from "../../assets/images/vi-sao-can-ban-nang-ha-1.webp";
import accessoriesImage from "../../assets/images/phu-kien-setup-can-co.webp";

const BenefitsSection = ({ type }) => {
  const benefitsContent = {
    chairs: {
      title: "Lợi ích ngồi ghế công thái học",
      image: chairImage,
      benefits: [
        {
          title: "Giảm đau lưng & cổ",
          description:
            "Thiết kế ghế công thái học Epione được tối ưu để mang đến sự hỗ trợ tuyệt vời cho lưng và cổ của bạn, giảm nhẹ sự khó chịu gây ra bởi việc ngồi kéo dài.",
        },
        {
          title: "Nâng cao năng suất làm việc",
          description:
            "Với ghế công thái học Epione, bạn có thể duy trì sự thoải mái và tập trung, cho phép bạn làm việc lâu hơn mà không bị phân tâm bởi những cơn đau nhức.",
        },
        {
          title: "Tính linh hoạt và khả năng điều chỉnh",
          description:
            "Ghế công thái học có tựa đầu và cơ chế hỗ trợ lưng điều chỉnh được cho phép bạn điều chỉnh ghế theo nhu cầu cơ thể, đảm bảo trải nghiệm ngồi được cá nhân hóa và thoải mái.",
        },
        {
          title: "Cải thiện tuần hoàn máu",
          description:
            "Ghế công thái học có thể điều chỉnh chiều cao thúc đẩy tư thế ngồi đúng, cải thiện tuần hoàn máu và giảm sự khó chịu khi ngồi trong thời gian dài.",
        },
      ],
    },
    desks: {
      title: "Lợi ích của bàn nâng hạ",
      image: deskImage,
      benefits: [
        {
          title: "Cải thiện tư thế",
          description:
            "Bàn nâng hạ thúc đẩy tư thế tốt hơn bằng cách căn chỉnh cột sống, giảm căng thẳng ở lưng và cổ, đồng thời ngăn ngừa tình trạng ngồi gù lưng trong các buổi làm việc kéo dài.",
        },
        {
          title: "Giảm nguy cơ mắc bệnh mãn tính",
          description:
            "Bàn nâng hạ Epione có khả năng thay đổi chiều cao, giúp giảm các nguy cơ sức khỏe liên quan đến việc ngồi kéo dài, như bệnh tim mạch và béo phì, bằng cách khuyến khích vận động thường xuyên và cải thiện tuần hoàn.",
        },
        {
          title: "Tăng năng suất làm việc",
          description:
            "Bàn nâng hạ có hệ thống quản lý dây cáp giúp không gian làm việc của bạn luôn gọn gàng, giảm thiểu yếu tố gây mất tập trung và nâng cao năng suất bằng cách đảm bảo môi trường làm việc ngăn nắp và hiệu quả.",
        },
        {
          title: "Cải thiện tâm trạng và giảm căng thẳng",
          description:
            "Việc thay đổi luân phiên giữa ngồi và đứng giúp giảm căng thẳng, cải thiện tâm trạng, và nâng cao sức khỏe cả về tinh thần lẫn thể chất trong giờ làm việc.",
        },
      ],
    },
    accessories: {
      title: "Phụ kiện setup không thể thiếu",
      image: accessoriesImage,
      benefits: [
        {
          title: "Arm màn hình - Giá treo màn hình",
          description:
            "Một món phụ kiện setup không thể thiếu cho mọi góc làm việc. Giá treo màn hình giúp điều chỉnh vị trí màn hình linh hoạt, tối ưu hóa không gian bàn làm việc.",
        },
        {
          title: "Pad trải bàn",
          description:
            "Biến góc làm việc đơn điệu thành không gian cá tính với pad trải bàn độc đáo. Đây là phụ kiện setup vừa tiện dụng vừa tăng trải nghiệm sử dụng chuột.",
        },
        {
          title: "Kệ màn hình",
          description:
            "Sắp xếp bàn làm việc gọn gàng hơn với kệ màn hình đa năng. Đây là một trong những phụ kiện setup thiết yếu giữ cho bàn làm việc gọn gàng và thẩm mỹ.",
        },
        {
          title: "Khay đi dây",
          description:
            "Khay đi dây là phụ kiện setup không thể thiếu để có một góc máy gọn gàng và an toàn. Dễ dàng lắp đặt, giúp quản lý dây cáp hiệu quả.",
        },
      ],
    },
  };

  const content = benefitsContent[type];

  if (!content) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-4xl font-semibold mb-12 text-center">
        {content.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Cột bên trái */}
        <div className="space-y-6">
          {content.benefits.slice(0, 2).map((benefit, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Hình ảnh ở giữa */}
        <div className="flex justify-center">
          <img
            src={content.image}
            alt={content.title}
            className="rounded-xl  object-contain"
          />
        </div>

        {/* Cột bên phải */}
        <div className="space-y-6">
          {content.benefits.slice(2).map((benefit, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

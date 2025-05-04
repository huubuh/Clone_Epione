import { Collapse } from "antd";
import FQAImage from "../../assets/images/image_238_5956d53a-9f85-40b0-a552-ad541b35659a.png";

const { Panel } = Collapse;

const FAQSection = ({ type }) => {
  const faqContent = {
    chairs: [
      {
        question: "Sản phẩm phù hợp với những người như thế nào?",
        answer:
          "Epione hướng tới 5 đối tượng chính là dân văn phòng, học sinh, sinh viên, người làm việc tự do và những người cần cải thiện tư thế ngồi. Sau đây là những thông tin cụ thể giúp bạn dễ dàng tham khảo:\n\n- ElysChair phù hợp với người có chiều cao từ 1,55m đến 1,75m và cân nặng tối đa 80kg.\n- FortisChair phù hợp với người có chiều cao từ 1,7m đến 1,85m và cân nặng tối đa 100kg.\n- EasyChair 2.0 phù hợp với người có chiều cao từ 1,65m đến 1,75m và cân nặng tối đa 50kg đến 120kg.\n- AliusChair phù hợp với người có chiều cao từ 1,55m đến 1,85m và cân nặng tối đa 50kg đến 120kg.\n\nXin lưu ý rằng các chỉ số này chỉ mang tính chất tham khảo. Để biết chính xác liệu ghế công thái học có phù hợp hay không, bạn vui lòng đến Showroom của Epione để trải nghiệm và nhận tư vấn trực tiếp nhé!.",
      },
      {
        question:
          "Lưới ghế công thái học ngồi lâu có bị chùng không? Epione có hỗ trợ bảo hành lưới không ?",
        answer:
          "Lưới ghế có thể bị chùng do lỗi từ nhà sản xuất, yếu tố vật lý (lực tác động lớn, nhiệt độ, độ ẩm môi trường, thời gian sử dụng,…), hoặc người dùng sử dụng sai cách (tư thế ngồi không đạt chuẩn hoặc khác với cách dùng phổ quát). Trong trường hợp lưới bị chùng lần đầu tiên do bất kỳ nguyên nhân nào, Epione sẽ hỗ trợ thay lưới miễn phí. Đối với những vấn đề hư hỏng của lưới ghế kể từ lần thứ hai, Epione vẫn hỗ trợ khách hàng với mức giảm 10% dựa trên giá thành thay thế.",
      },
      {
        question: "Ghế công thái học có dễ vệ sinh không?",
        answer:
          "Bạn hoàn toàn có thể vệ sinh ghế công thái học tại nhà dựa vàoHướng dẫn cách vệ sinh ghế công thái họccủa Epione. Đối với khách hàng khu vực nội thành TP. Hồ Chí Minh, Epione hiện hỗ trợ dịch vụ EasyCare cho các dòng ghế công thái học (kể cả sản phẩm đã hết thời hạn bảo hành). Gói dịch vụ EasyCare bao gồm 3 lần bảo dưỡng miễn phí tại nhà và thu phí 100,000đ cho mỗi lần bảo dưỡng tiếp theo. Để sử dụng, bạn vui lòng gửi yêu cầu thông qua Hotline, Fanpage hoặc Email của Epione để nhận hỗ trợ sớm nhất có thể.",
      },
      {
        question:
          "Epione có hỗ trợ vận chuyển và lắp đặt ghế công thái học không?",

        answer:
          "Epione hỗ trợ vận chuyển miễn phí các sản phẩm ghế công thái học trên toàn quốc, lắp đặt miễn phí (ngoại trừ ElysChair) trong khu vực nội thành TP. Hồ Chí Minh và Hà Nội. Tại các khu vực khác, bạn vui lòng tham khảo tài liệu Hướng dẫn lắp đặt được đính kèm trong kiện hàng hoặc xem video hướng dẫn lắp đặt trên kênh Youtube của Epione. Sau đó, nếu vẫn cần sự trợ giúp, đừng ngần ngại gọi điện bộ phận chăm sóc khách hàng (Hotline 1900 3471) để nhận sự hỗ trợ cần thiết.",
      },
      {
        question:
          "Tại sao có sự khác biệt về giá giữa phiên bản ghế đen và ghế xám?",
        answer:
          "Sự chênh lệch về giá giữa hai phiên bản màu đen và xám ở ghế công thái học xuất phát từ nhiều yếu tố như linh kiện cấu thành, chi phí nhuộm màu và xử lý bề mặt trong quá trình sản xuất. Tuy nhiên sẽ không có sự khác biệt về chất lượng giữa các phiên bản màu sắc.",
      },
      {
        question: "Trải nghiệm sản phẩm ở đâu?",
        answer:
          "Bạn có thể qua Showroom của Epione tại 100 Hoa Lan, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh.",
      },
      {
        question: "Chương trình bảo hành như thế nào?",
        answer:
          "Epione có chính sách bảo hành 2 năm trở lên đối với các sản phẩm ghế công thái học. Bạn có thể xem chi tiết vềchính sách bảo hành.",
      },

      {
        question: "Epione có chính sách trả góp không?",
        answer:
          "Hiện tại chúng tôi có hỗ trợ trả góp. Bạn có thể đến trực tiếp Showroom hoặc liên hệ Hotline 1900 3471 để được tư vấn.",
      },
    ],
    desks: [
      {
        question:
          "Bàn nâng hạ Epione SmartDesk Pro 2.0 khác Epione SmartDesk Lite 2.0 như thế nào?",
        answer:
          "Sự khác biệt chủ yếu đến từ việc Epione SmartDesk Pro 2.0 sở hữu chân bàn 3-Stage so với 2-Stage trên Epione SmartDesk Lite 2.0. Lợi thế này đem đến cho SmartDesk Pro 2.0 sự vững vàng, hạn chế rung lắc trong quá trình sử dụng. \n\nĐiểm khác biệt tiếp tiếp tải trong lúc nâng hạ lên đến 125kg cùng tốc độ nâng hạ nhanh chóng 38mm/s so với tải trọng 100kg và tốc độ 25mm/s ở SmartDesk Lite..",
      },
      {
        question: "Tải trọng của sản phẩm này?",
        answer:
          "Trọng tải các bàn nâng hạ của Epione đều đang đạt tiêu chuẩn cao nhất trên thị trường. Trọng tải của bàn nâng hạ SmartDesk Pro 2.0 lên đến 125kg và bàn nâng hạ SmartDesk Lite 2.0 lên đến 100kg.",
      },
      {
        question:
          "Bàn nâng hạ Epione khác với các sản phẩm khác trên thị trường như thế nào?",
        answer:
          "Về chất lượng sản phẩm. chúng tôi là đối tác trực tiếp với các thương hiệu lớn và uy tín để sản phẩm đạt chất lượng tốt nhất. Về mặt bàn chúng tôi luôn nghiên cứu và phát triển để mặt bàn đạt hoàn thiện tốt nhất. Các sản phẩm của chúng tôi trước khi đem đến tay khách hàng đều phải trải qua những giai đoạn kiểm tra chất lượng nghiêm ngặt.",
      },
      {
        question: "Sản phẩm được bảo hành như thế nào?",
        answer:
          "Đối với sản phẩm bàn nâng hạ, phần khung và cơ khi được Epione bảo hàng lên đến 5 năm. Xem thêm về chính sách bảo hành của Epione.",
      },
      {
        question: "Sản phẩm có được hỗ trợ lắp đặt tại nhà?",
        answer:
          "Chúng tôi hỗ trợ lắp đặt miễn phí tại khu vực Hồ Chí Minh và Hà Nội. Hiện tại chúng tôi chưa lắp đặt được ở các khu vực khác",
      },
    ],
    accessories: [
      {
        question:
          "Bạn đang gặp khó khăn với đơn hàng phụ kiện setup của mình và cần được hỗ trợ trực tiếp? Đừng lo lắng nhé!",
        answer:
          "Đội ngũ chăm sóc khách hàng tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn. Để được giải đáp thắc mắc nhanh chóng nhất, bạn có thể truy cập vào Fanpage Epione. Tại đây, Epione sẽ giúp bạn hoàn tất đơn hàng phụ kiện setup một cách thuận lợi nhất!",
      },
      {
        question: "Trải nghiệm sản phẩm ở đâu?",
        answer:
          "Bạn có thể qua Showroom của Epione tại 100 Hoa Lan, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh.",
      },
      {
        question: "Chương trình bảo hành như thế nào?",
        answer:
          "Epione có chính sách bảo hành tối thiểu 6 tháng trở lên đối với các sản phẩm phụ kiện setup. Bạn có thể xem chi tiết về chính sách bảo hành.",
      },
      {
        question: "Epione có chính sách trả góp không?",
        answer:
          "Hiện tại chúng tôi có hỗ trợ trả góp. Bạn có thể đến trực tiếp Showroom hoặc liên hệ Hotline 1900 3471 để được tư vấn.",
      },
    ],
  };

  const faqs = faqContent[type] || [];

  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <div className="bg-[#f0f0f0] rounded-xl p-8 flex flex-col md:flex-row gap-8">
        {/* Hình ảnh */}
        <div className="md:w-1/3 flex-col items-center justify-center">
          <h2 className="text-4xl font-semibold mb-6">
            Câu hỏi <br />
            thường gặp
          </h2>
          <img
            src={FQAImage}
            alt="FAQ Illustration"
            className="w-full h-48 object-contain rounded-xl"
          />
        </div>

        {/* Danh sách FAQ */}
        <div className="md:w-2/3">
          <Collapse
            bordered={false}
            expandIconPosition="right"
            expandIcon={({ isActive }) => <span>{isActive ? "−" : "+"}</span>}
          >
            {faqs.map((faq, index) => (
              <Panel
                header={
                  <span className="text-[#282828] font-semibold">
                    {faq.question}
                  </span>
                }
                key={index}
                className="border-b border-gray-200"
              >
                <p className="text-gray-600 whitespace-pre-line">
                  {faq.answer}
                </p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

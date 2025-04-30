import Logo from "../assets/images/Mask_group-2.png";
import Card from "../assets/images/image_236.png";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TikTokOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-[#282828] text-white text-sm">
      <div className="flex flex-col md:flex-row container mx-auto px-6 py-16 gap-10">
        <div className="flex-1 flex flex-col gap-4">
          <img className="w-[185px] h-[55px]" src={Logo} alt="Epione Logo" />
          <div className="flex gap-3">
            <EnvironmentOutlined className="text-xl mt-1" />
            <p>
              Công ty Cổ phần Siliconz
              <br />
              <strong>Giấy phép ĐKKD số 0316012611</strong>
              <br />
              <strong>Nơi cấp:</strong> Chi cục Thuế Quận Tân Bình
              <br />
              <strong>Ngày cấp:</strong> 12/11/2019
              <br />
              <strong>Địa chỉ:</strong> 1073/63B Đường Cách Mạng Tháng Tám, P.7,
              Q.Tân Bình, TP. HCM
              <br />
              <strong>Showroom:</strong> 100 Hoa Lan, P.2, Q.Phú Nhuận, TP. HCM
              <br />
              <strong>Email:</strong> hotro@epione.vn
            </p>
          </div>

          <div className="flex gap-3">
            <PhoneOutlined className="text-xl mt-1" />
            <p className="font-medium">
              HOTLINE
              <br />
              1900 3471
            </p>
          </div>
          <ul className="flex gap-2 pt-2">
            {[
              FacebookOutlined,
              InstagramOutlined,
              YoutubeOutlined,
              TikTokOutlined,
            ].map((Icon, idx) => (
              <li
                key={idx}
                className="bg-[#3e3e3e] w-10 h-10 rounded-sm flex items-center justify-center"
              >
                <a href="#">
                  <Icon className="text-white text-lg" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 2 */}
        <div className="flex-1 flex flex-col gap-2">
          <p className="text-[#7b7a7b] uppercase font-semibold">
            Thời gian hoạt động
          </p>
          <p className="font-semibold">Thứ 2 - Thứ 6</p>
          <div className="flex gap-30 border-b border-[#444] pb-2">
            <p>
              Sáng
              <br />
              <strong>09h00 - 12h30</strong>
            </p>
            <p>
              Chiều
              <br />
              <strong>13h30 - 20h00</strong>
            </p>
          </div>

          <p className="font-semibold">Thứ 7 - CN</p>
          <div className="flex gap-30">
            <p>
              Sáng
              <br />
              <strong>09h00 - 12h30</strong>
            </p>
            <p>
              Chiều
              <br />
              <strong>13h30 - 20h00</strong>
            </p>
          </div>

          <p className="mt-4 text-[#7b7a7b]  ">Phương thức thanh toán</p>
          <img
            src={Card}
            alt="Phương thức thanh toán"
            className="w-[243px] h-[34px]"
          />
        </div>

        <div className="flex-1">
          <p className="text-[#7b7a7b] uppercase font-semibold mb-2">
            Chính sách
          </p>
          <ul className="space-y-3">
            {[
              "Chính sách bảo hành",
              "Chính sách đổi trả và hoàn tiền",
              "Chính sách giao hàng",
              "Chính sách thanh toán",
              "Điều khoản sử dụng website",
              "Chính sách bảo mật thông tin",
              "Khách hàng doanh nghiệp (B2B)",
              "Chương trình Influencer",
              "Hỗ trợ kĩ thuật - Bảo hành",
              "Về Epione",
            ].map((text, idx) => (
              <li key={idx}>
                <a href="#" className="text-xm font-semibold ">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

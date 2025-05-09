import Logo from "../../assets/images/image_16.png";
import DeskBanner from "../../assets/images/highlight-delight.webp";
import Button from "../../components/ui/Button";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DeskFeature = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4">
        <div>
          <h2 className="text-4xl font-semibold mb-4 leading-tight">
            Bàn nâng hạ Epione DelightDesk
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Bàn nâng hạ Epione DelightDesk vốn được biết đến bởi sự giao thoa
            của nhiều tính năng mạnh mẽ, đặt ẩn dưới thiết kế hiện đại, tinh tế.
          </p>

          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <img src={Logo} alt="icon" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Cảm biến vật cản Anti-Collision
                </h4>
                <p className="text-gray-500">
                  Đảm bảo an toàn cho trẻ nhỏ, thú cưng cũng như vật dụng của
                  bạn trong quá trình sử dụng với công nghệ phát hiện vật cản.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <img src={Logo} alt="icon" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Bảng điều khiển thông minh
                </h4>
                <p className="text-gray-500">
                  Điều chỉnh nâng hạ dễ dàng với bảng điều khiển cảm ứng thông
                  minh với khoá điều khiển SmartLock, ghi nhớ 4 vị trí,...
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <img src={Logo} alt="icon" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Khay giấu dây tiện lợi
                </h4>
                <p className="text-gray-500">
                  Epione DelightDesk tích hợp thiết kế giấu dây tiện lợi, giữ
                  cho mặt bàn của bạn luôn gọn gàng và thẩm mỹ.
                </p>
              </div>
            </li>
          </ul>
          <div className="mt-10">
            <Link to="/products/delightdesk">
              <Button icon={<ArrowRightOutlined />} className="cursor-pointer">
                Xem tất cả tính năng
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <img
            src={DeskBanner}
            alt="Epione DelightDesk"
            className="w-full rounded-2xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default DeskFeature;

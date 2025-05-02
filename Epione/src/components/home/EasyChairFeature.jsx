import ChairBanner from "../../assets/images/highlight-easychair.webp";
import Logo from "../../assets/images/image_16.png";
import Button from "../../components/ui/Button";
import { ArrowRightOutlined } from "@ant-design/icons";

const EasyChairFeature = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4">
        <div>
          <img
            src={ChairBanner}
            alt="Epione EasyChair Feature"
            className="w-full  rounded-2xl shadow-md"
          />
        </div>

        <div>
          <h2 className="text-4xl font-semibold mb-4 ">
            Ghế công thái học <br />
            Epione EasyChair 2.0
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Với các tính năng ưu việt, Epione EasyChair sẽ hỗ trợ toàn diện cho
            cột sống lưng cổ, giúp bạn duy trì tư thế đúng và thoải mái suốt cả
            ngày dài làm việc.
          </p>

          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <img src={Logo} alt="icon" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Bản lưng ATLAS
                </h4>
                <p className="text-gray-500">
                  Phần tựa lưng ATLAS có thiết kế độc lập, điều chỉnh độ cao
                  linh hoạt giúp ôm sát, nâng đỡ cột sống và giảm thiểu bệnh đau
                  lưng của người Việt.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <img src={Logo} alt="icon" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Lưới Krall + Roth chuẩn Đức
                </h4>
                <p className="text-gray-500">
                  Chất liệu lưới cao cấp chắc chắn sẽ đáp ứng tất cả những mong
                  muốn của bạn bởi sự mềm mại, thân thiện với da người cùng như
                  độ đàn hồi cao.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <img src={Logo} alt="icon" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Tựa đầu Pro-Fit 3D
                </h4>
                <p className="text-gray-500">
                  Tựa đầu Pro-Fit 3D được thiết kế như điểm tựa vững chắc giúp
                  nâng cao sự tập trung và hạn chế các cơn đau mỏi vai gáy khi
                  ngồi làm việc.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-10">
            <Button icon={<ArrowRightOutlined />}>Xem tất cả tính năng</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EasyChairFeature;

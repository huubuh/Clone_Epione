import { Link } from "react-router-dom";

import ElysChair from "../../assets/images/chair/ElysChair/ghe-cong-thai-hoc-epione-elyschair-125084.webp";
import FortisChair20 from "../../assets/images/chair/FortisChair20/ghe-cong-thai-hoc-epione-fortischair-2-black-pro-front.webp";
import EasyChair20 from "../../assets/images/chair/EasyChair20/ghe-cong-thai-hoc-epione-easychair-20-582610.webp";
import AliusChair from "../../assets/images/chair/AliusChair/ghe-cong-thai-hoc-epione-aliuschair-6d-all-black-front.webp";
import SmartDeskMono from "../../assets/images/desk/SmartDeskMono/epione-smartdesk-mono-white-corner.webp";
import SmartDeskLite20 from "../../assets/images/desk/SmartDeskLite20/smartdesk-lite-2.0-corner-white.webp";
import SmartDeskPro20 from "../../assets/images/desk/SmartDeskPro20/smartdesk-pro-2.0-corner-white.webp";
import DelightDesk from "../../assets/images/desk/DelightDesk/7-ban-nang-ha-epione-delightdesk-side-right-oak.webp";

import SsElyChair from "../../assets/images/chair/so-sanh-ghe-cong-thai-hoc-elyschair.webp";
import SsFortisChair20 from "../../assets/images/chair/so-sanh-ghe-cong-thai-hoc-fortischair-2_e380a3d1-9462-409f-8726-b466fc96bab0.webp";
import SsEasyChair20 from "../../assets/images/chair/so-sanh-ghe-cong-thai-hoc-easychair.webp";
import SsAliusChair from "../../assets/images/chair/so-sanh-ghe-cong-thai-hoc-aliuschair.webp";

import SsSmartDeskMono from "../../assets/images/desk/epione-Smartdesk-mono-thong-so.webp";
import SsSmartDeskLite20 from "../../assets/images/desk/SmartDesk_Lite_2.0-thong-so_882af0fb-6dd5-428d-91a5-f06b35e27dbf.webp";
import SsSmartDeskPro20 from "../../assets/images/desk/Smartdesk_Pro_2.0-thong-so.webp";
import SsDelightDesk from "../../assets/images/desk/DelightDesk-thong-so.webp";
import Button from "../ui/Button";

const CompareSection = ({ type }) => {
  const compareContent = {
    chairs: {
      title: "Đâu là chiếc ghế công thái học phù hợp?",
      items: [
        {
          name: "Ghế công thái học Epione ElysChair",
          price: 2390000,
          slug: "elyschair",
          image: ElysChair,
          specImage: SsElyChair,
        },
        {
          name: "Ghế công thái học Epione FortisChair 2.0",
          price: 4590000,
          slug: "fortischair-20",
          image: FortisChair20,
          specImage: SsFortisChair20,
        },
        {
          name: "Ghế công thái học Epione EasyChair 2.0",
          price: 6690000,
          slug: "easychair-20",
          image: EasyChair20,
          specImage: SsEasyChair20,
        },
        {
          name: "Ghế công thái học Epione AliusChair",
          price: 13990000,
          slug: "aliuschair",
          image: AliusChair,
          specImage: SsAliusChair,
        },
      ],
    },
    desks: {
      title: "Đâu là chiếc bàn nâng hạ phù hợp?",
      items: [
        {
          name: "Bàn nâng hạ Epione SmartDesk Mono",
          price: 3990000,
          slug: "smartdesk-mono",
          image: SmartDeskMono,
          specImage: SsSmartDeskMono,
        },
        {
          name: "Bàn nâng hạ Epione SmartDesk Lite 2.0",
          price: 5990000,
          slug: "smartdesk-lite-20",
          image: SmartDeskLite20,
          specImage: SsSmartDeskLite20,
        },
        {
          name: "Bàn nâng hạ Epione SmartDesk Pro 2.0",
          price: 8690000,
          slug: "smartdesk-pro-20",
          image: SmartDeskPro20,
          specImage: SsSmartDeskPro20,
        },
        {
          name: "Bàn nâng hạ Epione DelightDesk",
          price: 10590000,
          slug: "delightdesk",
          image: DelightDesk,
          specImage: SsDelightDesk,
        },
      ],
    },
  };

  const content = compareContent[type];

  if (!content || type === "accessories") return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-4xl font-semibold mb-8 text-center">
        {content.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.items.map((item, index) => (
          <div key={index} className=" p-4 bg-white ">
            <img
              src={item.image}
              alt={item.name}
              className="mx-auto w-[160px] h-[120px] object-contain mb-4"
            />
            <h3 className="text-lg text-center font-semibold text-gray-800 mb-2">
              {item.name}
            </h3>
            <p className="text-xl font-semibold text-[#1106a7] text-center mb-4">
              {item.price.toLocaleString()} VND
            </p>
            <Link to={`/products/${item.slug}`} className="flex justify-center">
              <Button
                variant="primary"
                className=" w-[120px] h-[44px] cursor-pointer"
              >
                Mua ngay
              </Button>
            </Link>
            <img
              src={item.specImage}
              alt={`${item.name} specs`}
              className="w-full object-contain rounded-xl mt-10"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompareSection;

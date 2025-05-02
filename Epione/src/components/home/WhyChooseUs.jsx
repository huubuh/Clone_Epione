import TruckIcon from "../../assets/images/truck.png";
import MoneyIcon from "../../assets/images/money.png";
import PhoneIcon from "../../assets/images/phone.png";
import LockIcon from "../../assets/images/lock.png";

const WhyChooseUs = () => {
  const features = [
    {
      icon: TruckIcon,
      title: "Giao hàng miễn phí",
      desc: "Cho hóa đơn trên 2tr",
    },
    { icon: MoneyIcon, title: "Hỗ trợ hoàn tiền", desc: "Trong vòng 30 ngày" },
    {
      icon: PhoneIcon,
      title: "Hỗ trợ nhanh chóng",
      desc: "24/7 qua email và hotline",
    },
    { icon: LockIcon, title: "Thanh toán bảo mật", desc: "Bảo mật bởi Stripe" },
  ];

  return (
    <section className="bg-gray-100 py-8 rounded-xl my-10 w-[80%] mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">
        Tại sao nên chọn sản phẩm của chúng tôi?
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 ">
        {features.map((f, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="flex items-center  ">
              <img
                src={f.icon}
                alt={f.title}
                className="w-6 h-6 mx-auto mb-2"
              />
            </div>
            <div>
              <h4 className="font-semibold">{f.title}</h4>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

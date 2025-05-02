import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import hero0 from "../../assets/images/Rectangle_6.webp";
import hero1 from "../../assets/images/promotion-khai-hoa-t4.webp";
import hero2 from "../../assets/images/epione-smartdesk-mono-launch-banner.webp";
import hero3 from "../../assets/images/epione-website-banner.webp";
import "./Hero.css";
const Hero = () => {
  const slides = [hero1, hero2, hero3];

  return (
    <section className="relative py-10 bg-gray-100 ">
      <div className="absolute top-0 left-0 w-full  z-0">
        <img
          src={hero0}
          alt="blur background"
          className="object-cover blur-sm "
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[20%] bg-white z-0" />
      <div className="relative z-10 max-w-6xl mx-auto pt-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="hero-swiper rounded-2xl overflow-hidden shadow-lg"
        >
          {slides.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={img}
                  alt={`slide ${idx}`}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;

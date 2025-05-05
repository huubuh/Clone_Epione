import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputNumber } from "antd";
import { getProductBySlug } from "../../services/productService";
import Button from "../ui/Button";
import RatingStars from "../RatingStars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
import { CheckOutlined } from "@ant-design/icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "./ProductDetail.css";
const ProductDetail = () => {
  const { slug } = useParams();

  // State cơ bản
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  // State cho variant
  const [selectedSize, setSelectedSize] = useState(null); // Kích thước
  const [selectedStyle, setSelectedStyle] = useState(null); // Kiểu dáng
  const [selectedVersion, setSelectedVersion] = useState(null); // Phiên bản
  const [selectedColor, setSelectedColor] = useState(null);

  // State cho hình ảnh
  const [allImages, setAllImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductBySlug(slug);

        if (data) {
          setProduct(data);

          const productId = data.id;
          if (productId >= 1 && productId < 100) {
            setCategory("chairs");
          } else if (productId >= 100 && productId < 200) {
            setCategory("desks");
          } else {
            setCategory("accessories");
          }

          const firstVariant = data.variants?.[0];
          if (firstVariant) {
            if (firstVariant.size) {
              setSelectedSize(firstVariant.size);
            }

            if (firstVariant.style) {
              setSelectedStyle(firstVariant.style);
            }
            if (firstVariant.version) {
              setSelectedVersion(firstVariant.version);
            }
            if (firstVariant.color) {
              setSelectedColor(firstVariant.color);
            }
          }

          const productImages = data.images || [];
          const variantImages = data.variants
            ? data.variants.flatMap((variant) => variant.images || [])
            : [];

          const uniqueImages = [
            ...new Set([...productImages, ...variantImages]),
          ];
          setAllImages(uniqueImages);
          setActiveImage(uniqueImages[0]);
        } else {
          setError(`Không tìm thấy sản phẩm với slug: ${slug}`);
        }
      } catch (err) {
        console.error(err);
        setError("Lỗi khi tải sản phẩm. Vui lòng kiểm tra JSON Server.");
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (product) {
      const variants = product.variants || [];
      const selectedVariant = variants.find(
        (v) =>
          (!selectedSize || v.size === selectedSize) &&
          (!selectedStyle || v.style === selectedStyle) &&
          (!selectedVersion || v.version === selectedVersion) &&
          (!selectedColor || v.color === selectedColor)
      );

      const imagesToShow = selectedVariant?.images || product.images || [];

      if (imagesToShow.length > 0) {
        const firstImageIndex = allImages.indexOf(imagesToShow[0]);

        if (firstImageIndex !== -1) {
          setActiveImage(imagesToShow[0]);

          const swiperInstance =
            document.querySelector(".swiper-container")?.swiper;
          if (swiperInstance) {
            swiperInstance.slideToLoop(firstImageIndex);
          }
        }
      }
    }
  }, [
    selectedSize,
    selectedStyle,
    selectedVersion,
    selectedColor,
    product,
    allImages,
  ]);

  if (error) {
    return <div className="max-w-6xl mx-auto text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="max-w-6xl mx-auto">Đang tải sản phẩm...</div>;
  }

  const variants = product.variants || [];

  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];
  const styles = [...new Set(variants.map((v) => v.style).filter(Boolean))];
  const versions = [...new Set(variants.map((v) => v.version).filter(Boolean))];
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))];

  const selectedVariant = variants.find(
    (v) =>
      (!selectedSize || v.size === selectedSize) &&
      (!selectedStyle || v.style === selectedStyle) &&
      (!selectedVersion || v.version === selectedVersion) &&
      (!selectedColor || v.color === selectedColor)
  );

  const price = selectedVariant?.price || product.price;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Swiper
            spaceBetween={10}
            navigation={true}
            loop={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="swiper-container rounded-lg img-swiper"
            onSlideChange={(swiper) =>
              setActiveImage(allImages[swiper.realIndex])
            }
          >
            {allImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`${product.name} - Hình ${idx + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            loop={true}
            watchSlidesProgress
            modules={[Thumbs]}
            className="mt-4"
          >
            {allImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  className={`w-full h-full object-contain border rounded cursor-pointer ${
                    activeImage === img
                      ? "border-blue-600 border-2"
                      : "border-gray-300"
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-semibold text-[#1106a7] mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <RatingStars rating={product.rating} />
            <span className="ml-2 text-gray-600">
              ({product.rating || 0} đánh giá)
            </span>
          </div>
          <p className="text-2xl font-medium text-[#1106a7] mb-4">
            {price.toLocaleString()} VND
          </p>
          {/* Màu sắc */}
          {colors.length > 0 && (
            <div className="mb-4">
              <p className="font-medium mb-1">
                {category === "desks"
                  ? "Màu sắc mặt bàn"
                  : product.name.toLowerCase().includes("kệ")
                  ? "Color"
                  : "Màu sắc"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border px-3 py-1 rounded flex items-center gap-2 ${
                      selectedColor === color
                        ? "border-blue-600 text-blue-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: color.toLowerCase().includes("black")
                          ? "#000"
                          : color.toLowerCase().includes("gray")
                          ? "#999"
                          : color.toLowerCase().includes("oak")
                          ? "#d4a66a"
                          : color.toLowerCase().includes("white")
                          ? "#fff"
                          : color.toLowerCase().includes("walnut")
                          ? "#5d4037"
                          : color.toLowerCase().includes("ash")
                          ? "#f5f5dc"
                          : "#999",
                      }}
                    />
                    {selectedColor === color && <CheckOutlined />} {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Kiểu dáng */}
          {styles.length > 0 && (
            <div className="mb-4">
              <p className="font-medium mb-1 ">
                {category === "chairs"
                  ? "Phiên bản"
                  : product.name.toLowerCase().includes("arm")
                  ? "Kiểu"
                  : product.slug.toLowerCase().includes("shelf")
                  ? "Số tầng"
                  : "Loại"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`border px-3 py-1 rounded flex items-center gap-1 ${
                      selectedStyle === style
                        ? "border-blue-600 text-blue-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    {selectedStyle === style && <CheckOutlined />} {style}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Phiên bản */}
          {versions.length > 0 && (
            <div className="mb-4">
              <p className="font-medium mb-1">Version</p>
              <div className="flex gap-2 flex-wrap">
                {versions.map((version) => (
                  <button
                    key={version}
                    onClick={() => setSelectedVersion(version)}
                    className={`border px-3 py-1 rounded flex items-center gap-1 ${
                      selectedVersion === version
                        ? "border-blue-600 text-blue-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    {selectedVersion === version && <CheckOutlined />} {version}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* kích thước */}
          {sizes.length > 0 && (
            <div className="mb-4">
              <p className="font-medium mb-1">
                {category === "desks"
                  ? "Kích thước mặt bàn"
                  : product.name.toLowerCase().includes("monitor") ||
                    product.slug.toLowerCase().includes("monitor")
                  ? "Kích thước"
                  : "Kích thước"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-3 py-1 rounded flex items-center gap-1 ${
                      selectedSize === size
                        ? "border-blue-600 text-blue-700"
                        : "border-gray-300 text-gray-600"
                    }`}
                  >
                    {selectedSize === size && <CheckOutlined />} {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mb-4 w-full">
            <div>
              <label className="block text-gray-700 mb-2">Số lượng</label>
            </div>
            <div>
              <InputNumber min={1} value={quantity} onChange={setQuantity} />
              <Button variant="primary" className="w-full md:w-auto mb-6 ml-10">
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

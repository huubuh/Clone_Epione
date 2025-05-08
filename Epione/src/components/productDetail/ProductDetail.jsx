import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputNumber, message } from "antd";
import { getProductBySlug } from "../../services/productService";
import Button from "../ui/Button";
import RatingStars from "../RatingStars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade } from "swiper/modules";
// import truct from "../../assets/images/image_4.png";
import delevery from "../../assets/images/image_4_2.png";
// import shield from "../../assets/images/shield-tick.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "./ProductDetail.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  // State cho tình trạng tồn kho
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const { addToCart } = useCart();
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

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

            // Kiểm tra tình trạng tồn kho của biến thể đầu tiên
            setIsOutOfStock(firstVariant.quantity <= 0);
          } else if (data.quantity !== undefined) {
            // Nếu không có biến thể, kiểm tra tồn kho của sản phẩm chính
            setIsOutOfStock(data.quantity <= 0);
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

      // Cập nhật trạng thái tồn kho dựa trên biến thể được chọn
      if (selectedVariant) {
        setIsOutOfStock(selectedVariant.quantity <= 0);
      } else if (product.quantity !== undefined) {
        setIsOutOfStock(product.quantity <= 0);
      } else {
        setIsOutOfStock(false);
      }

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

  // Tìm biến thể hiện tại
  const selectedVariant = variants.find(
    (v) =>
      (!selectedSize || v.size === selectedSize) &&
      (!selectedStyle || v.style === selectedStyle) &&
      (!selectedVersion || v.version === selectedVersion) &&
      (!selectedColor || v.color === selectedColor)
  );

  const price = selectedVariant?.price || product.price;

  // Tìm tình trạng tồn kho theo từng thuộc tính
  const getSizeStock = (size) => {
    const relatedVariants = variants.filter(
      (v) =>
        v.size === size &&
        (!selectedColor || v.color === selectedColor) &&
        (!selectedStyle || v.style === selectedStyle) &&
        (!selectedVersion || v.version === selectedVersion)
    );
    return relatedVariants.some((v) => v.quantity > 0);
  };

  const getColorStock = (color) => {
    const relatedVariants = variants.filter(
      (v) =>
        v.color === color &&
        (!selectedSize || v.size === selectedSize) &&
        (!selectedStyle || v.style === selectedStyle) &&
        (!selectedVersion || v.version === selectedVersion)
    );
    return relatedVariants.some((v) => v.quantity > 0);
  };

  const getStyleStock = (style) => {
    const relatedVariants = variants.filter(
      (v) =>
        v.style === style &&
        (!selectedSize || v.size === selectedSize) &&
        (!selectedColor || v.color === selectedColor) &&
        (!selectedVersion || v.version === selectedVersion)
    );
    return relatedVariants.some((v) => v.quantity > 0);
  };

  const getVersionStock = (version) => {
    const relatedVariants = variants.filter(
      (v) =>
        v.version === version &&
        (!selectedSize || v.size === selectedSize) &&
        (!selectedColor || v.color === selectedColor) &&
        (!selectedStyle || v.style === selectedStyle)
    );
    return relatedVariants.some((v) => v.quantity > 0);
  };

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
              <p className="font-semibold mb-1 text-[14px]">
                {category === "desks"
                  ? "Màu sắc mặt bàn"
                  : product.name.toLowerCase().includes("kệ")
                  ? "Color"
                  : "Màu sắc"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => {
                  const isColorInStock = getColorStock(color);
                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`border px-1 py-1 rounded-lg flex items-center gap-2 text-[12px]  ${
                        selectedColor === color
                          ? "border-[#1106a7] text-[#1106a7]"
                          : "border-gray-300 text-gray-600"
                      } ${!isColorInStock ? "line-through opacity-60" : ""}`}
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
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* Kiểu dáng */}
          {styles.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-1 text-[14px] ">
                {category === "chairs"
                  ? "Phiên bản"
                  : product.name.toLowerCase().includes("arm")
                  ? "Kiểu"
                  : product.slug.toLowerCase().includes("shelf")
                  ? "Số tầng"
                  : "Loại"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {styles.map((style) => {
                  const isStyleInStock = getStyleStock(style);
                  return (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`border px-1 py-1 rounded-lg flex items-center gap-2 text-[12px]  ${
                        selectedStyle === style
                          ? "border-[#1106a7] text-[#1106a7]"
                          : "border-gray-300 text-gray-600"
                      } ${!isStyleInStock ? "line-through opacity-60" : ""}`}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* Phiên bản */}
          {versions.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-1 text-[14px]">Version</p>
              <div className="flex gap-2 flex-wrap">
                {versions.map((version) => {
                  const isVersionInStock = getVersionStock(version);
                  return (
                    <button
                      key={version}
                      onClick={() => setSelectedVersion(version)}
                      className={`border px-1 py-1 rounded-lg flex items-center gap-2 text-[12px] ${
                        selectedVersion === version
                          ? "border-[#1106a7] text-[#1106a7]"
                          : "border-gray-300 text-gray-600"
                      } ${!isVersionInStock ? "line-through opacity-60" : ""}`}
                    >
                      {version}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* kích thước */}
          {sizes.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-1 text-[14px]">
                {category === "desks"
                  ? "Kích thước mặt bàn"
                  : product.name.toLowerCase().includes("monitor") ||
                    product.slug.toLowerCase().includes("monitor")
                  ? "Kích thước"
                  : "Kích thước"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => {
                  const isSizeInStock = getSizeStock(size);
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-1 py-1 rounded-lg flex items-center gap-2 text-[12px] ${
                        selectedSize === size
                          ? "border-[#1106a7] text-[#1106a7]"
                          : "border-gray-300 text-gray-600"
                      } ${!isSizeInStock ? "line-through opacity-60" : ""}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex gap-20">
            <div>
              <InputNumber
                min={1}
                value={quantity}
                onChange={setQuantity}
                disabled={isOutOfStock}
              />
            </div>
            <div>
              {isOutOfStock ? (
                <button
                  className="w-full md:w-auto mb-6 ml-10 bg-[#1106a7] text-white px-4 py-2 rounded-2xl cursor-not-allowed opacity-70"
                  onClick={(e) => e.preventDefault()}
                >
                  Đã bán hết
                </button>
              ) : (
                <Button
                  variant="primary"
                  className=" md:w-auto mb-6 ml-10 cursor-pointer font-semibold "
                  onClick={() => {
                    if (!isAuthenticated) {
                      message.warning(
                        "Bạn cần đăng nhập để thêm vào giỏ hàng!"
                      );
                      navigate("/account/login");
                      return;
                    }
                    if (userRole === "admin") {
                      message.warning(
                        "Admin không thể thêm sản phẩm vào giỏ hàng!"
                      );
                      return;
                    }
                    addToCart(
                      {
                        ...product,
                        selectedSize,
                        selectedStyle,
                        selectedVersion,
                        selectedColor,
                        price,
                      },
                      quantity
                    );
                    message.success("Đã thêm vào giỏ hàng!");
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
              )}
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 w-[400px]  bg-white">
            <div className="flex items-center gap-2 mb-3 ">
              <img src={delevery} alt="Giao hàng" className="w-5 h-5" />
              <p className="font-semibold text-[12px]">Giao hàng</p>
            </div>

            <div className="grid grid-cols-3  text-[12px] text-gray-700">
              <span>Khu vực Nội thành TP.HCM</span>
              <span>Trong vòng 24h</span>
              <span className="font-semibold  text-black">Miễn phí</span>
              <span>Khu vực Ngoại thành TP.HCM</span>
              <span>1-3 Ngày</span>
              <span className="font-semibold text-black">Miễn phí</span>

              <span>Khu vực Nội thành & Ngoại thành Hà Nội</span>
              <span>3-4 ngày</span>
              <span className="font-semibold text-black">Miễn phí</span>

              <span>Các tỉnh thành khác</span>
              <span>5-7 ngày</span>
              <span className="font-semibold text-black">Miễn phí</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

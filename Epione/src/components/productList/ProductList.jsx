import { useState, useEffect } from "react";
import { getProductsByCategory } from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const ProductList = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Hiển thị 8 sản phẩm mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const validCategories = ["chairs", "desks", "accessories"];
        if (!validCategories.includes(type)) {
          throw new Error(
            "Danh mục không hợp lệ. Vui lòng chọn danh mục phù hợp (chairs, desks, accessories)."
          );
        }

        const data = await getProductsByCategory(type);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [type]);

  // Tính toán phân trang
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  if (loading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 mb-12">
      <h2 className="text-4xl font-semibold mb-5 mt-10">
        {totalProducts} sản phẩm
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-white text-gray-400 rounded-lg cursor-pointer "
            disabled={currentPage === 1}
          >
            <LeftOutlined />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === index + 1
                  ? "bg-white text-[#1106a7] border-[#1106a7]"
                  : "bg-white text-gray-500 border-gray-300 hover:text-[#1106a7] hover:border-[#1106a7] cursor-pointer"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 bg-white text-gray-400 rounded-lg cursor-pointer"
            disabled={currentPage === totalPages}
          >
            <RightOutlined />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductList;

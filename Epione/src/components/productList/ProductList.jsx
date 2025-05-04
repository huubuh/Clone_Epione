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
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            <LeftOutlined />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
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

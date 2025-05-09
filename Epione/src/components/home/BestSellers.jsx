import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import Button from "../../components/ui/Button";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getBestSellers } from "../../services/productService";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const data = await getBestSellers();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <section className="py-10 text-center">
        <h2 className="text-4xl font-semibold text-center mb-6">
          Epione Best Sellers
        </h2>
        <div className="text-center py-10">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 text-center">
        <h2 className="text-4xl font-semibold text-center mb-6">
          Epione Best Sellers
        </h2>
        <div className="text-center py-10 text-red-500">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="py-10 text-center">
      <h2 className="text-4xl font-semibold text-center mb-6">
        Epione Best Sellers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;

import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";

import ProductPage from "../pages/products/ProductPage";
import ProductDetailPage from "../pages/products/ProductDetailPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:slug" element={<ProductDetailPage />} />
      <Route path="/collections/:type" element={<ProductPage />} />
    </Routes>
  );
};

export default PublicRoutes;

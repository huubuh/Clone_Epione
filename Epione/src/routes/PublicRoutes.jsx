import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";

import ProductPage from "../pages/products/ProductPage";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:type" element={<ProductPage />} />
    </Routes>
  );
};

export default PublicRoutes;

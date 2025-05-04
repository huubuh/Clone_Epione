import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/Navbar";
import IntroSection from "../../components/productList/IntroSection";
import ProductList from "../../components/productList/ProductList";
import BenefitsSection from "../../components/productList/BenefitsSection";
import CompareSection from "../../components/productList/CompareSection";
import FAQSection from "../../components/productList/FAQSection";

const ProductPage = () => {
  const { type } = useParams();
  return (
    <>
      <NavBar />
      <IntroSection type={type} />
      <ProductList type={type} />
      <BenefitsSection type={type} />
      <CompareSection type={type} />
      <FAQSection type={type} />
      <Footer />
    </>
  );
};

export default ProductPage;

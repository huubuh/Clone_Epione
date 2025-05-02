import Footer from "../../components/Footer";
import BestSellers from "../../components/home/BestSellers";
import CategoryList from "../../components/home/CategoryList";
import DeskFeature from "../../components/home/DeskFeature";
import EasyChairFeature from "../../components/home/EasyChairFeature";
import Hero from "../../components/home/Hero";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import NavBar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <CategoryList />
      <BestSellers />
      <EasyChairFeature />
      <DeskFeature />
      <WhyChooseUs />
      <Footer />
    </>
  );
};
export default Home;

import "swiper/css";

import LatestProducts from "./common/LatestProducts";
import FeaturedProducts from "./common/FeaturedProducts";
import Hero from "./common/Hero";
import Layout from "./common/Layout";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "HOME - FK BAZAR"; // dynamic title
  }, []);
  return (
    <>
      <Layout>
        <Hero />
        <LatestProducts />
        <FeaturedProducts />
      </Layout>
    </>
  );
};

export default Home;

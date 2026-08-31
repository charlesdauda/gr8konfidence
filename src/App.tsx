import { useEffect } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/NavBar";
import Services from "./components/Services";
import Streamers from "./components/Streamers";
import Work from "./components/Work";
import { preloadSiteImages } from "./utils/preloadAssets";

const App = () => {
  useEffect(() => {
    preloadSiteImages();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Streamers />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
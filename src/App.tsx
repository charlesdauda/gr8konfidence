import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/NavBar";
import Services from "./components/Services";
import Work from "./components/Work";

const App = ()=> {
  return(
    <>
    <Navbar />
    <Hero />
    <About />
    <Work />
    <Services />
    <Contact />
    </>
  )
}

export default App;
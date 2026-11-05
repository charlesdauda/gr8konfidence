import { useLayoutEffect } from "react"
import About from "./components/About"
import Services from "./components/Services"
import Hero from "./components/Hero"
import Navbar from "./components/NavBar"
import Work from "./components/Work"
import Contact from "./components/Contact"
import Testimonials from "./components/Testimonials"

const App = () => {
  useLayoutEffect(() => {
    const targetId = window.location.hash.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;

    if (target) {
      const frame = window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start", behavior: "auto" });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return(
    <>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Work />
    <Testimonials />
    <Contact />
    </>
  )
}

export default App
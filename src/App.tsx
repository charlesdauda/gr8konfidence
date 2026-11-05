import { useLayoutEffect } from "react"
import About from "./components/About"
import Services from "./components/Services"
import Hero from "./components/Hero"
import Navbar from "./components/NavBar"
import Work from "./components/Work"
import Contact from "./components/Contact"

const App = () => {
  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", resetScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", resetScroll);
    };
  }, []);

  return(
    <>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <Work />
    <Contact />
    </>
  )
}

export default App
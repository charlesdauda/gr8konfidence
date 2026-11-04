import { lazy, Suspense } from "react"
import Hero from "./components/Hero"
import Navbar from "./components/NavBar"
import Contact from "./components/Contact"
import Work from "./components/Work"

const About = lazy(() => import("./components/About"))
const Services = lazy(() => import("./components/Services"))

const App = () => {
  return(
    <>
    <Navbar />
    <Hero />
    <Suspense fallback={null}>
      <About />
      <Services />
      <Work />
      <Contact />
    </Suspense>
    </>
  )
}

export default App
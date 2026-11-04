import About from "./components/About"
import Services from "./components/Services"
import Hero from "./components/Hero"
import Navbar from "./components/NavBar"

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
    </Suspense>
    </>
  )
}

export default App
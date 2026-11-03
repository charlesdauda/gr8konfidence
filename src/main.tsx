import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import "@fontsource/anton/latin-400.css";
import "@fontsource/bebas-neue/latin-400.css";
import "@fontsource/league-gothic/latin-400.css";
import "@fontsource-variable/oswald";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
);
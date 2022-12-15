import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeScript, extendTheme, theme as chakraTheme } from "@chakra-ui/react";

import theme from "./utils/themes";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS={true} theme={theme}>
        <ColorModeScript initialColorMode="dark" />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

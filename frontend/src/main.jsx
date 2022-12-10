import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    bg: {
      100: "#131921",
      200: "#232F3E",
    },
    logo: {
      100: " #18bcee",
    },
    search: {
      100: "#F3A847",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider resetCSS={true} theme={theme}>
        <ColorModeScript initialColorMode="light" />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import myTheme from "./utils/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={myTheme}>
        <ColorModeScript initialColorMode="light" />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

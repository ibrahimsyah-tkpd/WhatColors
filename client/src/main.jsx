import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, SkipNavLink, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

const breakpoints = {
  base: "0em",
  xs: "25em",
  sm: "37em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const theme = extendTheme({ breakpoints });

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <SkipNavLink>Skip to content</SkipNavLink>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);

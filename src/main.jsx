import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import { ThemeProvider } from "styled-components";


const theme = {
  colors: {
    black: "#2D2D2D",
    white: "#FDFEFF",
    accent: "#54ADBB",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

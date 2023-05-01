import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { BrowserRouter as Router } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#rgb(40, 44, 52)",
      light: "#63b8ff",
      dark: "#005db0",
      contrastText: "#000",
    },
    secondary: {
      main: "#4db6ac",
      light: "#82e9de",
      dark: "#00867d",
      contrastText: "#000",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ background: "rgb(40, 44, 52)" }}
      >
        <Router>
          <App />
        </Router>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

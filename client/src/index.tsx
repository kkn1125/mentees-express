import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import SnackbarProvider from "./contexts/SnackbarProvider";
import UserProvider from "./contexts/UserProvider";
import ProductProvider from "./contexts/ProductProvider";
import CommentProvider from "./contexts/CommentProvider";
import FeedbackProvider from "./contexts/FeedbackProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const globalStyles = `
  html, body, #root {
    width: 100%;
    height: 100%;
    padding: 0 !important;
  }

  .MuiBackdrop-root, .MuiPopover-root {
    width: 100vw;
    height: 100vh;
  }
`;

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <GlobalStyles styles={globalStyles} />
    <FeedbackProvider>
      <CommentProvider>
        <ProductProvider>
          <UserProvider>
            <SnackbarProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SnackbarProvider>
          </UserProvider>
        </ProductProvider>
      </CommentProvider>
    </FeedbackProvider>
  </ThemeProvider>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import GuessWordGame from "./GuessWordGame";
import UseMemoPolyfill from "./UseMemoPolyfill/UseMemoPolyfill";
import {ThemeProvider} from "./ContextApiDemo/ThemeProvider";
import { ThemeToggler} from "./ContextApiDemo/ThemeToggler";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider>
    <ThemeToggler />
    </ThemeProvider>
  </StrictMode>
);

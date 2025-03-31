import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import GuessWordGame from "./GuessWordGame";
import { Explorer } from "./FileExplorer/Explorer";
import { SearchAutoComplete } from "./SearchAutocomplete/SearchAutoComplete";
import { ProgressBar } from "./ProgressBar/ProgressBar";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ProgressBar />
  </StrictMode>
);

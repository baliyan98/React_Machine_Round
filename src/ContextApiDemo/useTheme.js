import { ThemeContext } from "./themeContext";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Use Theme can only be invoked inside its provider");
  }

  return context;
};

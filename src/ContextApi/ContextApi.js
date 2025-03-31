import { useContext, createContext, useState } from "react";

const THEME_DAY = "normal";
const THEME_DARK = "dark";

const themeContext = createContext({ theme: "normal", themeUpdate: () => {} });
export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("normal");
  const handleThemeUpdate = () => {
    setTheme((prev) => (prev === THEME_DARK ? THEME_DAY : THEME_DARK));
  };
  return (
    <themeContext.Provider value={{ theme, onThemeChange: handleThemeUpdate }}>
      {children}
    </themeContext.Provider>
  );
};
const useThemeContext = () => {
  const context = useContext(themeContext);
  if (!context) {
    throw new Error("theme context can only be used inside theme");
  }
  return context;
};
export const ToggleTheme = () => {
  const { theme, onThemeChange } = useThemeContext();
  const handleThemeChange = () => {
    onThemeChange();
  };
  return (
    <button onClick={handleThemeChange}>
      {theme === THEME_DARK ? "Switch to Normal Mode" : "Switch to Dark Mode"}
    </button>
  );
};

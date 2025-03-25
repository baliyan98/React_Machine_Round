import { useTheme } from "./useTheme";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeToggler = () => {
    setTheme();
  };
  return (
    <button
      style={{ backgroundColor: `${theme === "light" ? "grey" : "brown"}` }}
      onClick={handleThemeToggler}
    >
      {theme}
    </button>
  );
};

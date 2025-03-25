import { ThemeContext } from "./themeContext";
import { useState} from "react";

export const  ThemeProvider = ({children}) => {
    const [currentTheme , setCurrentTheme] = useState("light");
    const contextValue = {
        theme: currentTheme , 
        setTheme: () => {
            setCurrentTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
        }
    }
    return (
        <ThemeContext.Provider value={contextValue}>
        {children}
        </ThemeContext.Provider>
    )
}
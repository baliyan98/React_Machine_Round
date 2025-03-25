import { createContext } from "react";

const themeContext = () => {
    //create a context with default values.
  const themeContext = createContext({theme: "light" , setTheme: () => {}});

  export {themeContext }

};

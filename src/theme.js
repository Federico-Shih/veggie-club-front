import { createContext } from "react";

const theme = {
  light: {
    primary: "#FBA06E",
    secondary: "#CDEAC0",
  },
};

export const ThemeContext = createContext(theme);
export const themes = theme;

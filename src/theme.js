import { createContext } from "react";

/*
type Theme = {
  light: {
    primary: string;
    secondary: string;
  };
}
*/

const theme = {
  light: {
    primary: "#FBA06E",
    secondary: "#CDEAC0",
  },
};

export const ThemeContext = createContext(theme.light);
export const themes = theme;

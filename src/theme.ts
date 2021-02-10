import { createContext } from "react";

export type Theme = {
  primary: string;
  secondary: string;
};

const theme = {
  light: {
    primary: "#8B1E3F",
    secondary: "#DB4C40",
  },
};

export const ThemeContext = createContext(theme.light);
export const themes = theme;

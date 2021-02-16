/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { AlertLevel } from "./types";

const initialAlert = {
  message: "",
  level: AlertLevel.info,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlert: ({ message, level }: { message: string; level: AlertLevel }) => {},
};

export const AlertContext = createContext(initialAlert);

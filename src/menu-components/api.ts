import { v4 as uuid } from "uuid";
import placeholder from "../img/placeholder.jpg";
import { Category, Food } from "./types";
export const login = ({
  user,
  password,
}: {
  user: string;
  password: string;
}): Promise<string> => {
  console.log(user, password);
  return new Promise((resolve) => {
    resolve("JWT");
  });
};

export const getCategories = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { text: "Fritura", img: placeholder, id: uuid() },
        { text: "Horno", img: placeholder, id: uuid() },
        { text: "Ensaladas", img: placeholder, id: uuid() },
        { text: "Postres", img: placeholder, id: uuid() },
      ]);
    }, 0);
  });
};

export const getFoods = (category: string, day: number): Promise<Food[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        ...Array.from({ length: 20 }).map(() => ({
          name: "Tarta de zapallo",
          description: "Con huevo, zapallo, zanahoria, apto para celiacos.",
          img: placeholder,
          id: uuid(),
        })),
        {
          name: "Tarta de zapallosss",
          description: "Con huevo, zapallo, zanahoria, apto para celiacos.",
          img:
            "https://images.pexels.com/photos/3208624/pexels-photo-3208624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          id: uuid(),
        },
      ]);
    }, 0);
  });
};

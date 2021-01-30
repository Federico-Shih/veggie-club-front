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
        { text: "hola", img: placeholder, id: uuid() },
        { text: "holas", img: placeholder, id: uuid() },
        { text: "holass", img: placeholder, id: uuid() },
        { text: "holasssw", img: placeholder, id: uuid() },
      ]);
    }, 0);
  });
};

export const getFoods = (category: string, day: number): Promise<Food[]> => {
  console.log(category, day);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 20 }).map(() => ({
          name: "adsasd",
          description: "fuuuu",
          img: placeholder,
          id: uuid(),
        }))
      );
    }, 0);
  });
};

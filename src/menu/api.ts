import { v4 as uuid } from "uuid";
import placeholder from "../img/placeholder.jpg";
import { Category, Days, Food } from "./types";
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

export const getFoodsByDayAndCategory = (
  categoryId: string,
  day = -1
): Promise<Food[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        ...Array.from({ length: 20 }).map(() => ({
          name: "Tarta de zapallo",
          description: "Con huevo, zapallo, zanahoria, apto para celiacos.",
          img: placeholder,
          id: uuid(),
          days: [1, 2, 3],
        })),
        {
          name: "Tarta de zapallosss",
          description: "Con huevo, zapallo, zanahoria, apto para celiacos.",
          img:
            "https://images.pexels.com/photos/3208624/pexels-photo-3208624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          id: uuid(),
          days: [1, 2, 3],
        },
      ]);
    }, 0);
  });
};

export const createCategory = (
  categoryName: string,
  image: string
): Promise<Category> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: categoryName,
        img: image,
        id: uuid(),
      });
    }, 2000);
  });
};

export const modifyCategory = ({
  text,
  img,
  id,
}: Category): Promise<Category> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text,
        img,
        id,
      });
    }, 2000);
  });
};

export const createFood = (
  {
    name,
    description,
    img,
    days,
  }: {
    name: string;
    description: string;
    img: string;
    days: Days[];
  },
  categoryId: string
): Promise<Food> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name,
        description,
        img,
        days,
        id: uuid(),
      });
    }, 2000);
  });
};

export const modifyFood = (food: Food): Promise<Food> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(food);
    }, 2000);
  });
};

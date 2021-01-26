import { v4 as uuid } from "uuid";
import placeholder from "../img/placeholder.jpg";

// Food {
//   name,
//   description,
//   img
// }

export const login = ({ user, password }) => {
  console.log(user, password);
  return new Promise((resolve) => {
    resolve(true);
  });
};

export const getCategories = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { text: "hola", img: placeholder },
        { text: "holas", img: placeholder },
        { text: "holass", img: placeholder },
        { text: "holasssw", img: placeholder },
      ]);
    }, 0);
  });
};

export const getFoods = (category, day) => {
  console.log(category, day);
  return new Promise((resolve) => {
    resolve(
      Array.from({ length: 20 }).map(() => ({
        name: "adsasd",
        description: "fuuuu",
        img: placeholder,
        id: uuid(),
      }))
    );
  });
};

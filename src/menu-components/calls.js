import placeholder from "../img/placeholder.jpg";

export const login = ({ user, password }) => {
  console.log(user, password);
  return new Promise((resolve) => {
    resolve(true);
  });
};

export const categoryCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { text: "hola", img: placeholder },
        { text: "holas", img: placeholder },
        { text: "holass", img: placeholder },
        { text: "holasss", img: placeholder },
      ]);
    }, 0);
  });
};

export const temp = {};

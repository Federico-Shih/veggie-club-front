import axios from "axios";
import { Category, Day, Food } from "./types";

const serverURL = process.env.REACT_APP_API_URL || "http://localhost:3000";

axios.defaults.baseURL = serverURL;
// axios.defaults.headers["Content-Type"] = ;

axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

const tinify = (image: string) => {
  const imagePath = image.split(".");
  return `${imagePath[0]}.tiny.${imagePath[1]}`;
};

export const padImage = (imageEndpoint: string, tiny = false): string => {
  return `${serverURL}${tiny ? tinify(imageEndpoint) : imageEndpoint}`;
};

const addNameToBlob = (blob: Blob, name: string) =>
  `${name}.${blob.type.split("/")[1]}`;

export const login = async ({
  user,
  password,
}: {
  user: string;
  password: string;
}): Promise<boolean> => {
  const params = new URLSearchParams();
  params.append("username", user);
  params.append("password", password);
  const res = await axios.post("/login", params, { withCredentials: true });
  return Promise.resolve(res.status === 200);
};

export const getCategories = async (): Promise<Category[]> => {
  const categories = await axios.get("/categories");
  const parsedCategories = categories.data.map(
    (category: { name: string; image: string; _id?: string }) => {
      const newCategory = {
        name: category.name,
        image: padImage(category.image, true),
        id: category._id,
      };
      return newCategory;
    }
  );

  return Promise.resolve(parsedCategories);
};

export const getFoodsByDayAndCategory = async (
  categoryId: string,
  day?: Day
): Promise<Food[]> => {
  const res = await axios.get("/foods", {
    params: {
      categoryId,
      day,
    },
  });

  const newFoods = res.data.foods.map(
    (food: {
      categoryId: string;
      days: Day[];
      description: string;
      image: string;
      name: string;
      visible: boolean;
      _id?: string;
    }) => {
      const newFood = {
        ...food,
        id: food._id,
        image: padImage(food.image),
      };
      delete newFood._id;
      return newFood;
    }
  );

  return Promise.resolve(newFoods);
};

export const createCategory = async (
  categoryName: string,
  image: string
): Promise<Category> => {
  const data = new FormData();

  const imageData = await fetch(image);
  const imageBlob = await imageData.blob();

  data.append("name", categoryName);
  data.append("image", imageBlob, addNameToBlob(imageBlob, categoryName));

  const res = await axios.post("/category/add", data);

  const newCategory = {
    id: res.data._id,
    name: res.data.name,
    image: padImage(res.data.image, true),
  };
  return Promise.resolve(newCategory);
};

export const modifyCategory = async ({
  name,
  image,
  id,
}: {
  name: string;
  image?: string;
  id: string;
}): Promise<Category> => {
  const data = new FormData();
  if (image) {
    const imageData = await fetch(image);
    const imageBlob = await imageData.blob();
    data.append("image", imageBlob, addNameToBlob(imageBlob, name));
  }
  if (name) {
    data.append("name", name);
  }
  data.append("id", id);
  const res = await axios.patch("/category/edit", data);
  const editedCategory = {
    image: padImage(res.data.image, true),
    id: res.data._id,
    name: res.data.name,
  };

  return Promise.resolve(editedCategory);
};

export const createFood = async (
  {
    name,
    description,
    image,
    days,
    visible,
  }: {
    name: string;
    description: string;
    image: string;
    days: Day[];
    visible: boolean;
  },
  categoryId: string
): Promise<Food> => {
  const data = new FormData();
  data.append("name", name);
  if (description) {
    data.append("description", description);
  }
  const imageData = await fetch(image);
  const imageBlob = await imageData.blob();
  data.append("image", imageBlob, addNameToBlob(imageBlob, name));
  data.append("days", JSON.stringify(days));
  data.append("categoryId", categoryId);
  data.append("visible", JSON.stringify(visible));

  const res = await axios.post("/food/add", data);
  const newFood = {
    name: res.data.name,
    days: res.data.days,
    description: res.data.description,
    image: padImage(res.data.image),
    visible: res.data.visible,
    id: res.data._id,
  };

  return Promise.resolve(newFood);
};

export const modifyFood = async (
  food: Food,
  originalFood: Food
): Promise<Food> => {
  const data = new FormData();
  if (food.name !== originalFood.name) {
    data.append("name", food.name);
  }
  if (food.description !== originalFood.description) {
    data.append("description", food.description);
  }
  if (food.image !== originalFood.image) {
    const imageData = await fetch(food.image);
    const imageBlob = await imageData.blob();
    data.append("image", imageBlob, addNameToBlob(imageBlob, food.name));
  }
  if (food.visible !== originalFood.visible) {
    data.append("visible", JSON.stringify(food.visible));
  }
  data.append("days", JSON.stringify(food.days));
  data.append("id", food.id);

  const res = await axios.patch("/food/edit", data);
  if (res.data) {
    const { name, _id, image, description, visible, days } = res.data;
    const modifiedFood = {
      name,
      id: _id,
      image: padImage(image),
      description,
      visible,
      days,
    };
    return Promise.resolve(modifiedFood);
  }
  throw new Error("Unknown error");
};

export const deleteFood = async (foodId: string): Promise<void> => {
  const data = new URLSearchParams();
  data.append("id", foodId);
  const res = await axios.delete("/food/delete", { data });
  console.log(res);
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  const data = new URLSearchParams();
  data.append("id", categoryId);
  const res = await axios.delete("/category/delete", { data });
  console.log(res);
};

export type Category = {
  name: string;
  image: string;
  id: string;
};

export enum Day {
  Sunday = 0,
  Monday,
  Tuesday,
  Wendnesday,
  Thursday,
  Friday,
  Saturday,
}

export enum AlertLevel {
  error = "error",
  warning = "warning",
  info = "info",
  success = "success",
}

export type Food = {
  name: string;
  description: string;
  image: string;
  id: string;
  days: Day[];
  visible: boolean;
};

export const NullFood = {
  days: [0, 1, 2, 3, 4, 5, 6 ],
  name: "",
  id: "-1",
  description: "",
  image: "",
  visible: true,
} as Food;

export const NullCategory = {
  name: "",
  image: "",
  id: "-1",
} as Category;
export const NullFoodArray = [] as Food[];
export const NullCategoryArray = [] as Category[];

export type CategorySaveDto = {
  text: string;
  img: string;
};

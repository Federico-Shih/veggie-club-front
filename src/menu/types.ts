export type Category = {
  text: string;
  img: string;
  id: string;
};

export enum Days {
  Sunday = 0,
  Monday,
  Tuesday,
  Wendnesday,
  Thursday,
  Friday,
  Saturday,
}

export type Food = {
  name: string;
  description: string;
  img: string;
  id: string;
  days: Days[];
};

export const NullFood = {
  days: [],
  name: "",
  id: "-1",
  description: "",
  img: "",
} as Food;
export const NullCategory = {
  text: "",
  img: "",
  id: "-1",
} as Category;
export const NullFoodArray = [] as Food[];
export const NullCategoryArray = [] as Category[];

export type CategorySaveDto = {
  text: string;
  img: string;
};

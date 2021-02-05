export type Category = {
  name: string;
  image: string;
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
  image: string;
  id: string;
  days: Days[];
  visible: boolean;
};

export const NullFood = {
  days: [],
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

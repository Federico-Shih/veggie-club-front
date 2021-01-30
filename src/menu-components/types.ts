export type Category = {
  text: string;
  img: string;
  id: string;
};

export type Food = {
  name: string;
  description: string;
  img: string;
  id: string;
};

export const NullFood = {} as Food;
export const NullFoodArray = [] as Food[];
export const NullCategoryArray = [] as Category[];
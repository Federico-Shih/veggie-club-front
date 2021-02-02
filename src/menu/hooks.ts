import { useState } from "react";
import { Category, NullCategory, Food, NullFood } from "./types";

interface EditCategoryDto {
  show: boolean;
  category?: Category;
}

export const useCategoryEditor = ({
  show = false,
  category = NullCategory,
}: EditCategoryDto): [EditCategoryDto, (temp: EditCategoryDto) => void] => {
  const [isEditorShown, setEditorShown] = useState(show);
  const [editedCategory, setCategory] = useState(category);

  const setCategoryEditorState = ({
    show,
    category = NullCategory,
  }: EditCategoryDto) => {
    setEditorShown(show);
    if (!show) {
      setCategory(NullCategory);
    } else {
      setCategory(category);
    }
  };
  return [
    { show: isEditorShown, category: editedCategory },
    setCategoryEditorState,
  ];
};

interface EditFoodDto {
  show: boolean;
  food?: Food;
}

export const useFoodEditor = ({
  show = false,
  food = NullFood,
}: EditFoodDto): [EditFoodDto, (temp: EditFoodDto) => void] => {
  const [isEditorShown, setEditorShown] = useState(show);
  const [editedFood, setFood] = useState(food);

  const setFoodEditorState = ({ show, food = NullFood }: EditFoodDto) => {
    setEditorShown(show);
    if (!show) {
      setFood(NullFood);
    } else {
      setFood(food);
    }
  };
  return [{ show: isEditorShown, food: editedFood }, setFoodEditorState];
};

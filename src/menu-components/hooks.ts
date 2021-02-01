import { useState } from "react";
import { Category, NullCategory } from "./types";

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

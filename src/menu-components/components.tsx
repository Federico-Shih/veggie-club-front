import React, { ReactElement, useState } from "react";

import { FoodContainer, FoodImage, FoodTextContainer } from "./menu.styles";
import { Category } from "./types";
import noImage from "../img/no-image.jpg";
import { Input, InputAdornment } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export const CategoryEditor = ({
  category,
}: {
  category: Category;
}): ReactElement => {
  const [title, setTitle] = useState(category.text);
  const [editing, setEdit] = useState(false);

  return (
    <FoodContainer>
      <FoodImage
        src={Object.keys(category).length !== 0 ? category.img : noImage}
      ></FoodImage>
      <FoodTextContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Input
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          placeholder="Titulo"
          disabled={!editing}
          endAdornment={
            <InputAdornment position="end">
              <FontAwesomeIcon
                onClick={() => setEdit(!editing)}
                icon={faPencilAlt}
              />
            </InputAdornment>
          }
        ></Input>
      </FoodTextContainer>
    </FoodContainer>
  );
};

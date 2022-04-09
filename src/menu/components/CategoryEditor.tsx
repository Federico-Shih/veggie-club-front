import {
  faPencilAlt,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, Button, Backdrop, Dialog } from "@material-ui/core";
import { useWindowWidth } from "@react-hook/window-size";
import { LoaderWrapper } from "components/utilities";
import {
  FoodContainer,
  FoodImage,
  FoodTextContainer,
  DeleteContainer,
} from "menu/menu.styles";
import { ReactElement, useState, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { Category } from "types";

import { renderSaveMessage, SaveState } from "./common";
import ImageCropper from "./ImageCropper";
import noImage from "../../img/no-image.jpg";

export const CategoryEditor = ({
  category,
  onSave,
  onDelete,
}: {
  category: Category;
  onSave: (temp: Category) => Promise<void>;
  onDelete: (temp: string) => Promise<void>;
}): ReactElement => {
  const [title, setTitle] = useState(category.name);
  const [imageToEdit, setImageToEdit] = useState(category.image);

  const [deleting, setDeleting] = useState(false);
  const [editingImage, setEditingImage] = useState(false);
  const [saveState, setSaveState] = useState(SaveState.NotSaved);

  const mobile = useWindowWidth() < 600;

  // When props are updated
  useEffect(() => {
    const noCategory = Object.keys(category).length === 0;
    setTitle(noCategory ? "" : category.name);
    setImageToEdit(noCategory ? "" : category.image);
  }, [category]);

  // On image edited
  useEffect(() => {
    setEditingImage(false);
  }, [imageToEdit]);

  const saveHandler = async () => {
    if (title === "") {
      setSaveState(SaveState.NoTitle);
      return;
    }

    if (imageToEdit === "") {
      setSaveState(SaveState.NoImg);
      return;
    }
    setSaveState(SaveState.Saving);
    try {
      await onSave({
        image: imageToEdit,
        name: title,
        id: category?.id ?? "-1",
      });
    } catch (e) {
      setSaveState(SaveState.Error);
      return;
    }
    setSaveState(SaveState.CategorySaved);
  };

  return (
    <FoodContainer
      style={{
        border: mobile ? "" : "2px solid black",
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px",
        backgroundColor: mobile ? "white" : "",
        padding: mobile ? "10px" : 0,
      }}
    >
      <FoodImage src={imageToEdit !== "" ? imageToEdit : noImage}></FoodImage>
      <FontAwesomeIcon
        onClick={(e) => {
          e.stopPropagation();
          setEditingImage(!editingImage);
        }}
        icon={faPencilAlt}
        style={{ position: "absolute", right: 0, top: 0, margin: 20 }}
        size="2x"
      />
      <FoodTextContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TextField
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          fullWidth
          placeholder="Titulo"
          style={{
            backgroundColor: "white",
            marginTop: mobile ? "5px" : 0,
          }}
          variant={mobile ? "outlined" : "filled"}
        />
        <div
          style={
            mobile
              ? {}
              : {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  margin: 20,
                  display: "flex",
                  flexWrap: "wrap",
                }
          }
        >
          <LoaderWrapper
            Loader={<SyncLoader size={10} />}
            loading={saveState === SaveState.Saving}
          >
            <Button
              startIcon={<FontAwesomeIcon icon={faSave} />}
              variant={mobile ? "contained" : "outlined"}
              onClick={saveHandler}
            >
              Guardar
            </Button>
            {category.id !== "-1" ? (
              <Button
                startIcon={<FontAwesomeIcon icon={faTrash} />}
                variant={mobile ? "contained" : "outlined"}
                onClick={() => {
                  setDeleting(true);
                }}
              >
                Borrar
              </Button>
            ) : (
              <></>
            )}
            <div>{renderSaveMessage(saveState)}</div>
          </LoaderWrapper>
        </div>
      </FoodTextContainer>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
          setEditingImage(false);
        }}
        open={editingImage}
        style={{ zIndex: 1002 }}
      >
        {editingImage ? (
          <ImageCropper image={imageToEdit} setFinalImage={setImageToEdit} />
        ) : (
          <></>
        )}
      </Backdrop>
      <Dialog
        onClick={(e) => {
          e.stopPropagation();
        }}
        onClose={() => {
          setDeleting(false);
        }}
        open={deleting}
        style={{ zIndex: 1001 }}
      >
        <DeleteContainer>
          <div>Estas seguro de borrar la categoría {category.name}?</div>
          <Button
            style={{ margin: 5 }}
            variant="contained"
            onClick={async () => {
              setSaveState(SaveState.Saving);
              await onDelete(category.id);
              setSaveState(SaveState.NotSaved);
              setDeleting(false);
            }}
          >
            Borrar
          </Button>
          <Button
            style={{ margin: 5 }}
            variant="contained"
            onClick={() => {
              setDeleting(false);
            }}
          >
            Cancelar
          </Button>
        </DeleteContainer>
      </Dialog>
    </FoodContainer>
  );
};

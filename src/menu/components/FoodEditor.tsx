import { faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Backdrop,
  Dialog,
} from "@material-ui/core";
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
import { Day, Food } from "types";
import { SaveState, renderSaveMessage } from "./common";
import ImageCropper from "./ImageCropper";
import noImage from "../../img/no-image.jpg";
import DaysChooser from "./DaysChooser";

export const FoodEditor = ({
  food,
  onSave,
  onDelete,
}: {
  food: Food;
  onSave: (temp: Food) => Promise<void>;
  onDelete: (temp: string) => Promise<void>;
}): ReactElement => {
  const [editedFood, setEditedFood] = useState(food);
  const [editingImage, setEditingImage] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveState, setSaveState] = useState(SaveState.NotSaved);

  const setImageToEdit = (image: string) => {
    setEditedFood({ ...editedFood, image });
  };

  useEffect(() => {
    setEditingImage(false);
  }, [editedFood.image]);

  useEffect(() => {
    setEditedFood(food);
  }, [food]);

  const editedDays = editedFood.days;

  const setEditedDays = (days: Day[]) => {
    setEditedFood({ ...editedFood, days });
  };

  const saveHandler = async () => {
    if (editedFood?.name === "") {
      setSaveState(SaveState.NoTitle);
      return;
    }
    if (editedFood?.image === "") {
      setSaveState(SaveState.NoImg);
      return;
    }
    if (editedFood.days.length === 0) {
      setSaveState(SaveState.NoDays);
      return;
    }

    setSaveState(SaveState.Saving);
    try {
      const { image, name, description } = editedFood;
      await onSave({
        image,
        name,
        id: editedFood.id,
        description: description ?? "",
        days: editedDays,
        visible: editedFood.visible,
      });
    } catch (e) {
      setSaveState(SaveState.Error);
      return;
    }
    setSaveState(SaveState.FoodSaved);
  };
  const mobile = useWindowWidth() < 600;

  return (
    <FoodContainer
      style={{
        border: mobile ? "" : "2px solid black",
        borderTopLeftRadius: "20px",
        borderBottomLeftRadius: "20px",
        backgroundColor: mobile ? "white" : "",
        padding: mobile ? "10px" : 0,
        height: "auto",
      }}
    >
      <FoodImage
        src={editedFood.image !== "" ? editedFood.image : noImage}
      ></FoodImage>
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
          value={editedFood?.name ?? ""}
          onChange={({ target }) => {
            setEditedFood({ ...editedFood, name: target.value });
          }}
          fullWidth
          placeholder="Titulo"
          style={{
            backgroundColor: "white",
            marginTop: mobile ? "5px" : 0,
          }}
          variant={mobile ? "outlined" : "filled"}
        />
        <TextField
          value={editedFood?.description ?? ""}
          onChange={({ target }) => {
            setEditedFood({ ...editedFood, description: target.value });
          }}
          fullWidth
          multiline
          placeholder="Descripción"
          style={{
            backgroundColor: "white",
            marginTop: mobile ? "5px" : "20px",
          }}
          variant={mobile ? "outlined" : "filled"}
        />
        <div style={{ marginTop: "10px" }}>
          <DaysChooser initialDays={food.days} setDays={setEditedDays} />
        </div>
        <FormControlLabel
          label="visible"
          control={
            <Checkbox
              checked={editedFood.visible}
              onChange={() => {
                setEditedFood({ ...editedFood, visible: !editedFood.visible });
              }}
            />
          }
        />
        <div
          style={
            mobile
              ? {}
              : {
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
            {food.id !== "-1" ? (
              <Button
                style={{ margin: 5 }}
                variant="contained"
                onClick={async () => {
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
          <ImageCropper
            image={editedFood?.image ?? ""}
            setFinalImage={setImageToEdit}
          />
        ) : (
          <></>
        )}
      </Backdrop>
      <Dialog
        onClose={() => {
          setDeleting(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        open={deleting}
        style={{ zIndex: 1001 }}
      >
        <DeleteContainer>
          <div>Estas seguro de borrar la comida {food.name}?</div>
          <Button
            style={{ margin: 5 }}
            variant="contained"
            onClick={async () => {
              setSaveState(SaveState.Saving);
              await onDelete(food.id);
              setDeleting(false);
              setSaveState(SaveState.NotSaved);
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

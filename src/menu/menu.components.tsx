import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { FoodContainer, FoodImage, FoodTextContainer } from "./menu.styles";
import { Category, CategorySaveDto, Days, Food, NullFood } from "./types";
import noImage from "../img/no-image.jpg";
import {
  Backdrop,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faPencilAlt,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import styled from "styled-components";
import ReactCrop from "react-image-crop";
import TextFit from "react-textfit";
import { v4 as uuid } from "uuid";

import "react-image-crop/dist/ReactCrop.css";
import { CategoryNotSavedError, FoodNotSavedError } from "./errors";
import { LoaderWrapper } from "components/utilities";
import { SyncLoader } from "react-spinners";

const ImageEditorContainer = styled.div`
  width: 90vw;
  height: 70vh;
  min-height: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  @media only screen and (min-width: 600px) {
    width: 40vw;
    height: 700px;
  }
  display: flex;
  flex-direction: column-reverse;
`;

const CropperContainer = styled.div`
  position: relative;
  bottom: 0;
  width: 100%;
  height: 80%;
  background-color: #eaeaea;
`;

const ImageEditorTitle = styled.div`
  flex-grow: 1;
`;

type ImageCropperProps = {
  image: string;
  setFinalImage: (temp: string) => void;
};

const ImageCropper = ({ image, setFinalImage }: ImageCropperProps) => {
  const [imageCropperId] = useState(uuid());
  const [cropImage, setCropImage] = useState<string | ArrayBuffer>(image);
  const [cropFinalImage, setCropFinalImage] = useState<ReactCrop.Crop>({});
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 12 / 9,
  } as ReactCrop.Crop);
  const imgRef = useRef();

  useEffect(() => {
    setCropImage(image);
  }, [image]);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setCropImage(reader.result ?? ""));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const saveImage = () => {
    if (!cropFinalImage || !imgRef.current) {
      return;
    }

    const canvas = document.createElement("canvas");
    const {
      width,
      height,
      x,
      y,
    } = (cropFinalImage as unknown) as ReactCrop.Crop;
    const image = (imgRef?.current as unknown) as HTMLImageElement;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = (width as number) * pixelRatio;
    canvas.height = (height as number) * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      (x as number) * scaleX,
      (y as number) * scaleY,
      (width as number) * scaleX,
      (height as number) * scaleY,
      0,
      0,
      width as number,
      height as number
    );

    setFinalImage(canvas.toDataURL());
  };

  return (
    <ImageEditorContainer
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CropperContainer>
        {cropImage === "" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <label htmlFor={imageCropperId}>
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<FontAwesomeIcon icon={faCamera} />}
              >
                Upload
              </Button>
            </label>
          </div>
        ) : (
          <ReactCrop
            src={cropImage as string}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCropFinalImage(c)}
            crop={crop}
            minWidth={100}
            imageStyle={{ objectFit: "contain" }}
            onImageLoaded={onLoad}
          />
        )}
      </CropperContainer>
      <ImageEditorTitle>
        <TextFit style={{ height: "33%" }}>Editor de imagenes</TextFit>
        <input
          accept="image/*"
          style={cropImage === "" ? { display: "none" } : {}}
          id={imageCropperId}
          multiple
          type="file"
          onChange={onSelectFile}
        />
        <Button
          onClick={saveImage}
          variant="contained"
          startIcon={<FontAwesomeIcon icon={faSave} />}
        >
          Guardar imagen
        </Button>
      </ImageEditorTitle>
    </ImageEditorContainer>
  );
};

enum SaveState {
  NotSaved,
  CategorySaved,
  FoodSaved,
  Saving,
  Error,
  NoTitle,
  NoImg,
  NoDesc,
  NoDays,
}

const renderSaveMessage = (saveState: SaveState) => {
  switch (saveState) {
    case SaveState.CategorySaved:
      return "Tu categoria ha sido guardada.";
    case SaveState.FoodSaved:
      return "Tu comida ha sido guardada.";
    case SaveState.Error:
      return "Error guardando";
    case SaveState.NoTitle:
      return "No hay nombre de categoria";
    case SaveState.NoImg:
      return "No haz establecido imagen";
    case SaveState.NoDays:
      return "No elegiste dias";
    default:
      return "";
  }
};

export const CategoryEditor = ({
  category,
  onSave,
}: {
  category: Category;
  onSave: (temp: Category) => Promise<Category>;
}): ReactElement => {
  const noCategory = Object.keys(category).length === 0;
  const [title, setTitle] = useState(noCategory ? "" : category.text);
  const [imageToEdit, setImageToEdit] = useState(
    noCategory ? "" : category.img
  );

  const [editing, setEdit] = useState(false);
  const [editingImage, setEditingImage] = useState(false);
  const [saveState, setSaveState] = useState(SaveState.NotSaved);

  const mobile = useWindowWidth() < 600;

  // When props are updated
  useEffect(() => {
    setTitle(noCategory ? "" : category.text);
    setImageToEdit(noCategory ? "" : category.img);
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
      await onSave({ img: imageToEdit, text: title, id: category?.id ?? "-1" });
    } catch (e) {
      setSaveState(SaveState.Error);
      console.error(e);
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
          disabled={!editing}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FontAwesomeIcon
                  onClick={() => setEdit(!editing)}
                  icon={faPencilAlt}
                />
              </InputAdornment>
            ),
          }}
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
              : { position: "absolute", bottom: 0, left: 0, margin: 20 }
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
        <ImageCropper image={imageToEdit} setFinalImage={setImageToEdit} />
      </Backdrop>
    </FoodContainer>
  );
};

export const FoodEditor = ({
  food = NullFood,
  onSave,
}: {
  food: Food;
  onSave: (temp: Food) => Promise<Food>;
}): ReactElement => {
  const [editedFood, setEditedFood] = useState(food);
  const [editingName, setEditingName] = useState(false);
  const [editingImage, setEditingImage] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [saveState, setSaveState] = useState(SaveState.NotSaved);

  const setImageToEdit = (img: string) => {
    setEditedFood({ ...editedFood, img });
  };

  useEffect(() => {
    setEditingImage(false);
  }, [editedFood.img]);

  useEffect(() => {
    setEditedFood(food);
  }, [food]);

  const editedDays = editedFood.days;

  const setEditedDays = (days: Days[]) => {
    setEditedFood({ ...editedFood, days });
  };

  const saveHandler = async () => {
    if (editedFood?.name === "") {
      setSaveState(SaveState.NoTitle);
      return;
    }
    if (editedFood?.img === "") {
      setSaveState(SaveState.NoImg);
      return;
    }
    if (editedFood.days.length === 0) {
      setSaveState(SaveState.NoDays);
      return;
    }

    setSaveState(SaveState.Saving);
    try {
      const { img, name, description } = editedFood;
      await onSave({
        img,
        name,
        id: editedFood.id,
        description: description ?? "",
        days: editedDays,
      });
    } catch (e) {
      console.error(e);
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
      }}
    >
      <FoodImage
        src={editedFood.img !== "" ? editedFood.img : noImage}
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
          disabled={!editingName}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FontAwesomeIcon
                  onClick={() => setEditingName(!editingName)}
                  icon={faPencilAlt}
                />
              </InputAdornment>
            ),
          }}
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
          disabled={!editingDesc}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FontAwesomeIcon
                  onClick={() => setEditingDesc(!editingDesc)}
                  icon={faPencilAlt}
                />
              </InputAdornment>
            ),
          }}
          style={{
            backgroundColor: "white",
            marginTop: mobile ? "5px" : "20px",
          }}
          variant={mobile ? "outlined" : "filled"}
        />
        <DaysChooser initialDays={food.days} setDays={setEditedDays} />
        <div
          style={
            mobile
              ? {}
              : { position: "absolute", bottom: 0, left: 0, margin: 20 }
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
        <ImageCropper
          image={editedFood?.img ?? ""}
          setFinalImage={setImageToEdit}
        />
      </Backdrop>
    </FoodContainer>
  );
};

type DaysChooserProps = {
  initialDays: Days[];
  setDays: (temp: Days[]) => void;
};

const DayButton = styled(IconButton)`
  background-color: ${({ selected: active }: { selected: boolean }) =>
    active ? "#eaeaea" : "none"};
  width: 30px;
  height: 30px;
  font-size: 15px;
  margin: 2px;
`;

const DaysChooser = ({ initialDays, setDays }: DaysChooserProps) => {
  const [days, setDaysState] = useState({
    [Days.Monday]: false,
    [Days.Tuesday]: false,
    [Days.Wendnesday]: false,
    [Days.Thursday]: false,
    [Days.Friday]: false,
    [Days.Saturday]: false,
    [Days.Sunday]: false,
  });

  useEffect(() => {
    const newDays = {
      [Days.Monday]: false,
      [Days.Tuesday]: false,
      [Days.Wendnesday]: false,
      [Days.Thursday]: false,
      [Days.Friday]: false,
      [Days.Saturday]: false,
      [Days.Sunday]: false,
    };

    for (let i = 0; i < initialDays.length; i += 1) {
      newDays[initialDays[i]] = true;
    }
    setDaysState(newDays);
  }, [initialDays]);

  const onClickHandler = (day: Days) => {
    const newDays = {
      ...days,
      [day]: !days[day],
    };
    const dayList = [];
    const entries = Object.entries(newDays);
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i][1]) {
        dayList.push(parseInt(entries[i][0]));
      }
    }
    setDaysState(newDays);
    setDays(dayList);
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <DayButton selected={days[0]} onClick={() => onClickHandler(0)}>
        Do
      </DayButton>
      <DayButton selected={days[1]} onClick={() => onClickHandler(1)}>
        Lu
      </DayButton>
      <DayButton selected={days[2]} onClick={() => onClickHandler(2)}>
        Ma
      </DayButton>
      <DayButton selected={days[3]} onClick={() => onClickHandler(3)}>
        Mi
      </DayButton>
      <DayButton selected={days[4]} onClick={() => onClickHandler(4)}>
        Ju
      </DayButton>
      <DayButton selected={days[5]} onClick={() => onClickHandler(5)}>
        Vi
      </DayButton>
      <DayButton selected={days[6]} onClick={() => onClickHandler(6)}>
        Sa
      </DayButton>
    </div>
  );
};

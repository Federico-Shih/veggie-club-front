import styled from "styled-components";
import ReactCrop from "react-image-crop";
import TextFit from "react-textfit";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuid } from "uuid";

import { faCamera, faSave } from "@fortawesome/free-solid-svg-icons";

const ImageEditorContainer = styled.div`
  width: 90vw;
  height: 70vh;
  min-height: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  @media only screen and (min-width: 600px) {
    width: 40vw;
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

const ImageCropper = ({
  image,
  setFinalImage,
}: ImageCropperProps): ReactElement => {
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
        <TextFit style={{ height: "33%" }}>Editor de imágenes</TextFit>
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

export default ImageCropper;

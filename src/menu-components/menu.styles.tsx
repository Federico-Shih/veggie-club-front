import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonBase, TextField } from "@material-ui/core";
import styled, { css } from "styled-components";

// Login form
export const SignInButton = styled.button`
  width: 50%;
  height: 30px;
  margin-top: auto;
  margin-bottom: 15px;
`;

export const InputStyle = styled(TextField)`
  width: 80%;
`;

export const LoginContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 100px;
  width: 80vw;
  height: 250px;
  border-radius: 5%;
  flex-direction: column;
  align-items: center;
  background-color: white;
  opacity: ${({ active }: { active: boolean }) => {
    if (active) return 1;
    return 0;
  }};
  display: ${({ active }: { active: boolean }) => {
    if (active) return "flex";
    return "none";
  }};
  @media only screen and (min-width: 600px) {
    width: 20vw;
    min-width: 300px;
  }
  transition: opacity 0.5s ease;
  -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=12, Direction=63, Color=#000000)"; /*IE 8*/
  -moz-box-shadow: -1px 2px 12px -4px rgba(0, 0, 0, 0.6); /*FF 3.5+*/
  -webkit-box-shadow: -1px 2px 12px -4px rgba(0, 0, 0, 0.6); /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
  box-shadow: -1px 2px 12px -4px rgba(0, 0, 0, 0.6); /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=12, Direction=135, Color=#000000); /*IE 5.5-7*/
`;

export const SwitchButton = styled(FontAwesomeIcon)`
  margin-left: auto;
  font-size: 40px;
  margin-right: 5px;
  padding: 5px;
  &:hover {
    border: 1px solid black;
    -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=16, Direction=63, Color=#000000)"; /*IE 8*/
    -moz-box-shadow: -1px 2px 16px -4px rgba(0, 0, 0, 0.3); /*FF 3.5+*/
    -webkit-box-shadow: -1px 2px 16px -4px rgba(0, 0, 0, 0.3); /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
    box-shadow: -1px 2px 16px -4px rgba(0, 0, 0, 0.3); /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=16, Direction=135, Color=#000000); /*IE 5.5-7*/
  }
`;

// Header
export const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=11, Direction=247, Color=#000000)"; /*IE 8*/
  -moz-box-shadow: 3px -7px 11px 11px rgba(0, 0, 0, 0.3); /*FF 3.5+*/
  -webkit-box-shadow: 3px -7px 11px 11px rgba(0, 0, 0, 0.3); /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
  box-shadow: 3px -7px 11px 11px rgba(0, 0, 0, 0.3); /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=11, Direction=135, Color=#000000); /*IE 5.5-7*/
  position: sticky;
  top: 0;
  z-index: 999;
`;

// Categories

const selected = css`
  border: 2px solid black;
  background-color: #a5a5a5;
  font-weight: bold;
`;

type CategoryProps = {
  active: boolean;
  src: string;
}

export const CategoryButton = styled.button<CategoryProps>`
  width: 45%;
  font-size: 20px;
  border-width: 0px;
  height: 25vh;
  max-height: 120px;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:active {
    transform: translateY(3px);
  }

  ${({ active }) => {
    return active ? selected : ``;
  }}

  @media only screen and (min-width: 600px) {
    border-radius: 20px;
    height: auto;
    background-color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 12px;
    width: 80%;
    background-image: none;
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      ${({ src }) => `url(${src})`};
    background-size: cover;
    margin: 5px;
  }
`;

export const CategoriesContainer = styled.div`
  width: 100%;
  height: 90vh;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 26px;
  font-weight: 500;

  @media only screen and (min-width: 600px) {
    margin: 15px;
    background-color: ${({ color }) => color};
    width: 250px;
    flex-wrap: nowrap;
  }
`;

export const CategoriesImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

// Foods section
export const FoodsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media only screen and (max-width: 600px) {
    margin: auto;
    margin-top: 8px;
  }

  @media only screen and (min-width: 600px) {
    min-height: 150px;
    min-width: 360px;
    overflow: hidden;
    height: 1%;
    margin: 10px;
    margin-top: 15px;
    min-width: 300px;
    justify-content: flex-start;
  }
`;

export const FoodThumbnail = styled(ButtonBase)`
  display: flex;
  flex-direction: column;
  align-self: center;
  -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=11, Direction=315, Color=#000000)"; /*IE 8*/
  -moz-box-shadow: -1px -1px 11px -1px rgba(0, 0, 0, 0.6); /*FF 3.5+*/
  -webkit-box-shadow: -1px -1px 11px -1px rgba(0, 0, 0, 0.6); /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
  box-shadow: -1px -1px 11px -1px rgba(0, 0, 0, 0.6); /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=11, Direction=135, Color=#000000); /*IE 5.5-7*/
`;

export const FoodImageThumbnail = styled.div`
  background-image: ${({ src }: { src: string }) => `url(${src})`};
  background-size: contain;
  width: 44vw;
  min-width: 50px;
  height: 120px;
  @media only screen and (min-width: 600px) {
    width: 180px;
    height: 150px;
  }
`;

export const FoodNameThumbnail = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 5px;
`;

export const FoodPadding = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
  @media only screen and (min-width: 600px) {
    margin: 8px;
  }
`;

// Image shower
export const ImageShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

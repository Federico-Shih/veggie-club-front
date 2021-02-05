import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonBase, TextField } from "@material-ui/core";
import styled, { css } from "styled-components";
import TextFit from "react-textfit";

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
  width: 80vw;
  height: 250px;
  border-radius: 5%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: white;
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
};

export const CategoryButton = styled.button<CategoryProps>`
  width: 45%;
  border-width: 0px;
  height: 25vh;
  max-height: 120px;
  outline: none;
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:active {
    transform: translateY(3px);
  }

  ${({ active }) => {
    return active ? selected : ``;
  }}

  @media only screen and (min-width: 600px) {
    border-radius: 20px;
    height: 40px;
    background-color: white;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 12px;
    width: 80%;
    background-image: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    min-height: 100vh;
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

export const CategoryText = styled(TextFit)`
  color: white;
  height: 30px;
  font-size: 20px;
  @media only screen and (min-width: 600px) {
    color: black;
    height: 100%;
  }
`;

// Foods section
export const FoodsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  @media only screen and (max-width: 600px) {
    margin-top: 8px;
  }

  @media only screen and (min-width: 600px) {
    width: calc(100vw - 250px);
    min-height: 150px;
    min-width: 360px;
    overflow: hidden;
    height: 1%;
    margin: 10px;
    margin-top: 15px;
    justify-content: flex-start;
  }
`;

export const FoodThumbnail = styled(ButtonBase)`
  display: flex;
  flex-direction: column;
  align-self: center;
  position: relative;
  width: 44vw;
  min-width: 50px;
  -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=11, Direction=315, Color=#000000)"; /*IE 8*/
  -moz-box-shadow: -1px -1px 11px -1px rgba(0, 0, 0, 0.6); /*FF 3.5+*/
  -webkit-box-shadow: -1px -1px 11px -1px rgba(0, 0, 0, 0.6); /*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
  box-shadow: -1px -1px 11px -1px rgba(0, 0, 0, 0.6); /* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=11, Direction=135, Color=#000000); /*IE 5.5-7*/

  @media only screen and (min-width: 600px) {
    width: 180px;
  }
`;

export const FoodImageThumbnail = styled.div`
  background-image: ${({ src }: { src: string }) => `url(${src})`};
  background-size: contain;
  height: 120px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const FoodNameThumbnail = styled(TextFit)`
  font-weight: 500;
  margin-top: 5px;
  width: 100%;
  height: 30px;
  padding: 4px;
`;

export const FoodPadding = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
  @media only screen and (min-width: 600px) {
    margin: 8px;
  }
`;

// Image shower

export const FoodContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: 600px) {
    flex-direction: row-reverse;
    height: 60vh;
    min-height: 150px;
  }
`;

export const FoodImage = styled.img`
  width: 80vw;
  object-fit: cover;
  height: 100%;

  @media only screen and (min-width: 600px) {
    width: 70vh;
    min-width: 200px;
  }
`;

export const FoodTextContainer = styled.div`
  height: 100%;
  overflow: hidden;
  width: 80vw;

  @media only screen and (min-width: 600px) {
    width: 18vw;
    border: 0px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 20px;
    min-width: 200px;
    background-color: white;
  }
`;

export const FoodName = styled(TextFit)`
  font-weight: 700;
  height: 30px;

  @media only screen and (max-width: 600px) {
    color: white;
    margin-top: 20px;
  }
`;

export const FoodDescription = styled.div`
  margin-top: 15px;
  font-size: 18px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media only screen and (max-width: 600px) {
    color: white;
  }

  @media only screen and (min-width: 600px) and (max-width: 1024px) {
    font-size: 16px;
  }
`;

// Admin styles

export const AddCategoryButton = styled(Button)`
  width: 45%;
  border-width: 0px;
  height: 25vh;
  max-height: 120px;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 50px;

  border: 2px solid grey;

  @media only screen and (min-width: 600px) {
    background-color: white;
    font-size: 20px;
    border-radius: 20px;
    height: auto;
    color: black;
    width: auto;
    margin-top: 10px;
  }
  &:hover {
    background-color: #eaeaea;
  }
  @media only screen and (max-width: 600px) {
    margin: 5px;
  }
`;

export const DeleteContainer = styled.div`
  width: 80vw;
  height: 200px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (min-width: 600px) {
    width: 400px;
  }
`;

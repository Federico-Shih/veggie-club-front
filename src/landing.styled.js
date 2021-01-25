import styled from "styled-components";
import { Link } from "react-router-dom";

export const Header = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    height: 130px;
    background-color: ${({ color }) => color};
    justify-content: flex-end;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  @media only screen and (min-width: 600px) {
    width: 100%;
    background-color: #e7e7e7;
    flex-direction: row;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media only screen and (min-width: 600px) {
    height: 300px;
    width: 300px;
    background-color: white;
    border-radius: 50%;
    padding: 20px;
  }
`;

export const ImageBackground = styled.div`
  @media only screen and (min-width: 600px) {
    width: 100%;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: ${({ src }) => `url(${src})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  width: 80vw;
`;

const LinkStyle = `
  font-size: 16px;
  padding: 5px 15px 20px 15px;
  background-color: transparent;
  text-decoration: none;
  &:visited {
    color: #3d3d3d;
  }
  &:hover {
    font-weight: bold;
    border-width: 0 0 2px 0;
  }
  @media only screen and (min-width: 600px) {
    font-size: 30px;
    padding: 25px 50px 25px 50px;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: black;
}
`;

export const StyledLink = styled(Link)`
  ${LinkStyle}
`;

export const StyledPageMark = styled.a`
  ${LinkStyle}
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

export const DecorationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
    width: 60vw;
    padding-top: 30px;
    justify-content: space-evenly;
  }
`;

export const Decoration = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({ color }) => {
    return color;
  }};
  @media only screen and (min-width: 600px) {
    flex-direction: column;
    background-color: transparent;
    align-items: center;
    margin: none;
  }
`;

export const DecorationTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  @media only screen and (min-width: 600px) {
    font-size: 30px;
    padding-top: 20px;
  }
`;

export const DecorationDesc = styled.div`
  font-size: 10px;
  text-align: center;
  padding-top: 10px;
  @media only screen and (min-width: 600px) {
    font-size: 20px;
    width: 15vw;
    padding-top: 20px;
  }
`;

export const DecorationText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px;
  @media only screen and (min-width: 600px) {
    align-items: center;
  }
`;

export const Padding = styled.div`
  width: 100%;
  height: ${({ height }) => height}px;
`;

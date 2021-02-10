import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import placeholder from "./img/placeholder.jpg";

export const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 2000;
  @media only screen and (max-width: 600px) {
    background-color: transparent;
    justify-content: flex-end;
  }

  @media only screen and (min-width: 600px) {
    position: relative;
    width: 100%;
  }
`;

const activeImageBackground = css`
  @media only screen and (max-width: 600px) {
    height: 50px;
    box-shadow: inset 0px 4px 21px 300px rgba(139, 30, 63, 1);
  }

  @media only screen and (min-width: 600px) {
    filter: brightness(50%);
  }
`;

type ImageProps = {
  src: string;
  active: boolean;
};

export const ImageBackground = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ active }: ImageProps) => (active ? activeImageBackground : null)}

  @media only screen and (min-width: 600px) {
    width: 100%;
    height: calc(100vh - 150px);
    display: flex;
    background-image: ${({ src }: { src: string }) => `url(${src})`};
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: none;
  }

  transition: 0.5s;
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
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  width: 80vw;
`;

export const SloganContainer = styled.div`
  font-weight: bold;
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 25px;
    padding: 20px;
    text-align: center;
    height: 90vh;
    width: 100%;
    background-position: center center;
    background-image: url(${placeholder});
    box-shadow: inset 0px 4px 21px 300px rgba(0, 0, 0, 0.6);
  }
  @media only screen and (min-width: 600px) {
    font-size: 40px;
    margin-top: 60px;
  }
`;

const LinkStyle = css`
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

export const LinkButton = styled(Link)`
  font-size: 20px;
  text-decoration: none;
  top: 0;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  margin-top: 20px;
  background-color: rgba(219, 76, 64);
  &:visited {
    color: white;
  }
  transition: 0.2s;
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
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  @media only screen and (min-width: 600px) {
    padding-top: 90px;
  }
`;

export const Decoration = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;

  @media only screen and (min-width: 600px) {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 33%;
    flex-direction: column;
    background-color: transparent;
    align-items: center;
    margin: none;
  }
`;

export const DecorationImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: brightness(60%);
  object-fit: cover;
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
  font-size: 16px;
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
  color: white;

  @media only screen and (max-width: 600px) {
    width: 70%;
    height: 200px;
    background-color: rgba(219, 76, 64, 0.7);
  }
  @media only screen and (min-width: 600px) {
    align-items: center;
  }
`;

export const Padding = styled.div`
  width: 100%;
  height: ${({ height }: { height: number }) => height}px;
`;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import withSizes from "react-sizes";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "./img/logo.png";
import ShortLogo from "./img/short-logo.png";
import placeholder from "./img/placeholder.jpg";
import { ThemeContext } from "./theme";

const Header = styled.div`
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

const Footer = styled.div`
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

const LogoContainer = styled.div`
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

const ImageBackground = styled.div`
  @media only screen and (min-width: 600px) {
    width: 100%;
    height: 40vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url(${placeholder});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  width: 80vw;
`;

const Button = styled(Link)`
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

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

function Landing({ mobile }) {
  const DecorationContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding-top: 10px;
    @media only screen and (min-width: 600px) {
      flex-direction: row;
      width: 80vw;
      padding-top: 30px;
    }
  `;

  const Decoration = styled.div`
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
    }
  `;

  const DecorationTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    @media only screen and (min-width: 600px) {
      font-size: 30px;
      padding-top: 20px;
    }
  `;

  const DecorationDesc = styled.div`
    font-size: 10px;
    text-align: center;
    padding-top: 10px;
    @media only screen and (min-width: 600px) {
      font-size: 20px;
      width: 15vw;
      padding-top: 20px;
    }
  `;

  const DecorationText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5px;
    @media only screen and (min-width: 600px) {
      align-items: center;
    }
  `;

  const Padding = styled.div`
    width: 100%;
    height: ${({ height }) => height}px;
  `;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <>
              <Header color={theme.secondary}>
                <ImageBackground>
                  <LogoContainer>
                    {!mobile && (
                      <img
                        src={ShortLogo}
                        alt="veggie-club-short"
                        style={{ objectFit: "contain" }}
                        width={150}
                      />
                    )}
                    <img
                      src={Logo}
                      alt="veggie-club"
                      style={{ objectFit: "contain" }}
                      width={mobile ? 200 : 240}
                      height={mobile ? 50 : null}
                    />
                  </LogoContainer>
                </ImageBackground>
                <ButtonContainer>
                  <Button>NOSOTROS</Button>
                  <Button to="/menu">MENU</Button>
                  <Button>CONTACTO</Button>
                </ButtonContainer>
              </Header>
              <div
                style={
                  mobile
                    ? {
                        fontWeight: "bold",
                        fontSize: "20px",
                        paddingTop: "20px",
                      }
                    : {
                        fontWeight: "bold",
                        fontSize: "40px",
                        paddingTop: "30px",
                      }
                }
              >
                SE TRATA DE COMER BIEN
              </div>
              <DecorationContainer>
                <Decoration color={theme.secondary}>
                  <img
                    src={placeholder}
                    alt="placeholder"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                    width={mobile ? 100 : 250}
                    height={mobile ? 100 : 250}
                  />
                  <DecorationText>
                    <DecorationTitle>MAYOR VARIEDAD</DecorationTitle>
                    <DecorationDesc>
                      Amplia variacion de degustaciones para que puedas
                      disfrutar los diversos sabores del oriente
                    </DecorationDesc>
                  </DecorationText>
                </Decoration>
                <Decoration color={theme.primary}>
                  <img
                    src={placeholder}
                    alt="placeholder"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                    width={mobile ? 100 : 250}
                    height={mobile ? 100 : 250}
                  />
                  <DecorationText>
                    <DecorationTitle>100% VEGETARIANO</DecorationTitle>
                    <DecorationDesc>
                      Te demostramos mediante los platos que lo vegetariano es
                      mas que comer solo verduras
                    </DecorationDesc>
                  </DecorationText>
                </Decoration>
                <Decoration color={theme.secondary}>
                  <img
                    src={placeholder}
                    alt="placeholder"
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                    width={mobile ? 100 : 250}
                    height={mobile ? 100 : 250}
                  />
                  <DecorationText>
                    <DecorationTitle>MEJOR CALIDAD</DecorationTitle>
                    <DecorationDesc>
                      Los ingredientes mas frescos y de mejor calidad para que
                      puedas disfrutar cada bocado
                    </DecorationDesc>
                  </DecorationText>
                </Decoration>
              </DecorationContainer>
              <Padding height={mobile ? 50 : 250} />
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#E7E7E7",
                  padding: "10px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: mobile ? "20px" : "30px",
                }}
              >
                Contacto
              </div>
              <InfoContainer>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "30px",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bolder",
                      fontSize: mobile ? "18px" : "24px",
                    }}
                  >
                    Horarios de atención:
                  </div>
                  <div
                    style={{
                      fontSize: mobile ? "14px" : "20px",
                      padding: "5px",
                    }}
                  >
                    Lunes a Viernes de 10:00hs - 15:00hs
                  </div>
                  <div>
                    {!mobile ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            paddingTop: mobile ? "10px" : "30px",
                            margin: "10px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faMapMarker}
                            style={{ fontSize: 25, marginRight: "25px" }}
                          />
                          <a href="https://goo.gl/maps/NewR4A1Wb3He4Tdn6">
                            Junin 1087
                          </a>
                        </div>
                        <div style={{ margin: "10px" }}>
                          <FontAwesomeIcon
                            icon={faPhone}
                            style={{ marginRight: "20px", fontSize: 25 }}
                          />
                          1554564455
                        </div>
                        <div style={{ margin: "10px" }}>
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ marginRight: "20px", fontSize: 25 }}
                          />
                          fedeshih@gmail.com
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.329169035132!2d-58.3995416847705!3d-34.59583698046152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca9660558e29%3A0x4937e3fe81b590a4!2sVeggie%20Club!5e0!3m2!1ses-419!2sar!4v1609964546301!5m2!1ses-419!2sar"
                  width="600"
                  height="450"
                  frameBorder="0"
                  allowFullScreen=""
                  aria-hidden="false"
                  title="maps"
                  style={
                    mobile
                      ? { width: "80vw", height: "200px", paddingTop: "10px" }
                      : {}
                  }
                />
              </InfoContainer>
              <Padding height={mobile ? 0 : 300} />
              <Footer>
                <div style={{ margin: "10px" }}>
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    style={{ marginRight: "20px" }}
                  />
                  <a href="https://goo.gl/maps/NewR4A1Wb3He4Tdn6">Junin 1087</a>
                </div>
                {mobile ? (
                  <>
                    <div style={{ margin: "10px" }}>
                      <FontAwesomeIcon
                        icon={faPhone}
                        style={{ marginRight: "20px" }}
                      />
                      1554564455
                    </div>
                    <div style={{ margin: "10px" }}>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ marginRight: "20px" }}
                      />
                      fedeshih@gmail.com
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div style={{ marginLeft: "auto", alignSelf: "center" }}>
                  Done by Shift
                </div>
              </Footer>
              <Padding height={mobile ? 100 : 0} />
            </>
          );
        }}
      </ThemeContext.Consumer>
    </div>
  );
}

const mapSizestoProps = ({ width }) => ({
  mobile: width < 600,
});

Landing.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

export default withSizes(mapSizestoProps)(Landing);

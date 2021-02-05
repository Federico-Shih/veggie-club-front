import React, { ReactElement, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";

import Logo from "./img/logo.png";
import ShortLogo from "./img/short-logo.png";
import placeholder from "./img/placeholder.jpg";
import { ThemeContext } from "./theme";
import {
  Header,
  ImageBackground,
  LogoContainer,
  ButtonContainer,
  StyledLink,
  StyledPageMark,
  DecorationContainer,
  Decoration,
  DecorationText,
  DecorationDesc,
  Padding,
  Footer,
  DecorationTitle,
  InfoContainer,
  SloganContainer,
} from "./landing.styles";

function Landing(): ReactElement {
  const mobile = useWindowWidth() < 600;
  const theme = useContext(ThemeContext);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Header color={theme.secondary}>
        <ImageBackground src={placeholder}>
          <LogoContainer>
            {!mobile && (
              <img
                src={ShortLogo}
                alt="veggie-club-short"
                style={{ objectFit: "contain" }}
                width={180}
              />
            )}
            <img
              src={Logo}
              alt="veggie-club"
              style={{ objectFit: "contain" }}
              width={mobile ? 200 : 170}
              height={mobile ? 50 : "auto"}
            />
          </LogoContainer>
        </ImageBackground>
        <ButtonContainer>
          <StyledPageMark href="#NOSOTROS">NOSOTROS</StyledPageMark>
          <StyledLink to="/menu">MENU</StyledLink>
          <StyledPageMark href="#CONTACTO">CONTACTO</StyledPageMark>
        </ButtonContainer>
      </Header>
      <SloganContainer id="NOSOTROS">SE TRATA DE COMER BIEN</SloganContainer>
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
              Amplia variacion de degustaciones para que puedas disfrutar los
              diversos sabores del oriente
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
              Te demostramos mediante los platos que lo vegetariano es mas que
              comer solo verduras
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
              Los ingredientes mas frescos y de mejor calidad para que puedas
              disfrutar cada bocado
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
        id="CONTACTO"
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
                  <a href="https://goo.gl/maps/NewR4A1Wb3He4Tdn6">Junin 1087</a>
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
          aria-hidden="false"
          title="maps"
          style={
            mobile ? { width: "80vw", height: "200px", paddingTop: "10px" } : {}
          }
        />
      </InfoContainer>
      <Padding height={mobile ? 0 : 300} />
      <Footer>
        <div style={{ margin: "10px" }}>
          <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: "20px" }} />
          <a href="https://goo.gl/maps/NewR4A1Wb3He4Tdn6">Junin 1087</a>
        </div>
        {mobile ? (
          <>
            <div style={{ margin: "10px" }}>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: "20px" }} />
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
    </div>
  );
}

export default Landing;

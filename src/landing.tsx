import React, { ReactElement, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faPhone,
  faEnvelope,
  faBars,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import AOS from "aos";
import "aos/dist/aos.css";

import Logo from "./img/logo.png";
import ShortLogo from "./img/short-logo.png";
import mainImg from "./img/main.jpg";
import firstImg from "./img/first.jpg";
import secondImg from "./img/second.jpg";
import thirdImg from "./img/third.jpg";
import { ThemeContext } from "./theme";
import { DecorationImage, LinkButton } from "./landing.styles";
import { Link } from "react-router-dom";
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
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Landing(): ReactElement {
  const mobile = useWindowWidth() < 600;
  const theme = useContext(ThemeContext);
  const [scrollPos, setScrollPos] = useState(0);
  const [open, setDrawer] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPos(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    AOS.init();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ContactContainer = () => (
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
      <a
        href="https://wa.me/5491150034171"
        style={{ margin: "10px", color: "black" }}
      >
        <FontAwesomeIcon
          icon={faWhatsapp}
          style={{ marginRight: "20px", fontSize: 25 }}
        />
        +1550034171
      </a>
    </>
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Drawer
        anchor="top"
        open={open}
        onClose={() => {
          setDrawer(false);
        }}
      >
        <List style={{ backgroundColor: theme.primary }}>
          <div style={{ marginTop: "50px" }}></div>
          <Link to="/menu">
            <ListItem button>
              <ListItemIcon>
                <FontAwesomeIcon color="white" icon={faBookOpen} />
              </ListItemIcon>
              <ListItemText style={{ color: "white" }} primary="Menu" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Header color={theme.secondary}>
        <ImageBackground active={scrollPos > 30} src={mainImg}>
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
              width={mobile ? 150 : 170}
              height={mobile ? 50 : "auto"}
            />
          </LogoContainer>
          {mobile ? (
            <FontAwesomeIcon
              style={{
                position: "absolute",
                right: 0,
                fontSize: "25px",
                color: "white",
                margin: "10px",
              }}
              onClick={() => {
                setDrawer(!open);
              }}
              icon={faBars}
            />
          ) : (
            <></>
          )}
        </ImageBackground>
        {!mobile ? (
          <ButtonContainer>
            <StyledPageMark href="#NOSOTROS">NOSOTROS</StyledPageMark>
            <StyledLink to="/menu">MENÚ</StyledLink>
            <StyledPageMark href="#CONTACTO">CONTACTO</StyledPageMark>
          </ButtonContainer>
        ) : (
          <></>
        )}
      </Header>
      <SloganContainer id="NOSOTROS">
        <div>SE TRATA DE COMER BIEN</div>
        {mobile ? (
          <LinkButton to="/menu">Conocé nuestro menú!</LinkButton>
        ) : (
          <></>
        )}
      </SloganContainer>
      <DecorationContainer>
        <Decoration data-aos={mobile ? "" : "fade-up"} data-aos-offset="300">
          <DecorationImage src={firstImg} alt="placeholder" />
          <DecorationText
            data-aos={!mobile ? "" : "fade-up"}
            data-aos-offset="300"
          >
            <DecorationTitle>MAYOR VARIEDAD</DecorationTitle>
            <DecorationDesc>
              Amplia variación de degustaciones para que puedas disfrutar los
              diversos sabores del oriente
            </DecorationDesc>
          </DecorationText>
        </Decoration>
        <Decoration data-aos={mobile ? "" : "fade-up"} data-aos-offset="400">
          <DecorationImage src={secondImg} alt="placeholder" />
          <DecorationText
            data-aos={!mobile ? "" : "fade-up"}
            data-aos-offset="300"
          >
            <DecorationTitle>100% VEGETARIANO</DecorationTitle>
            <DecorationDesc>
              Te demostramos mediante los platos que lo vegetariano es mas que
              comer solo verduras
            </DecorationDesc>
          </DecorationText>
        </Decoration>
        <Decoration data-aos={mobile ? "" : "fade-up"} data-aos-offset="500">
          <DecorationImage src={thirdImg} alt="placeholder" />
          <DecorationText
            data-aos={!mobile ? "" : "fade-up"}
            data-aos-offset="300"
          >
            <DecorationTitle>MEJOR CALIDAD</DecorationTitle>
            <DecorationDesc>
              Los ingredientes más frescos y de mejor calidad para que puedas
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
            Lunes a Sábados de 10:30hs - 15:00hs
          </div>
          <div>{!mobile ? <ContactContainer /> : <></>}</div>
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
      {mobile ? <ContactContainer /> : <></>}
      <Padding height={mobile ? 150 : 0} />
      <Footer>
        <div style={{ margin: "10px" }}>
          <FontAwesomeIcon icon={faMapMarker} style={{ marginRight: "20px" }} />
          <a href="https://goo.gl/maps/NewR4A1Wb3He4Tdn6">Junin 1087</a>
        </div>
        <div style={{ marginLeft: "auto", alignSelf: "center" }}>
          Done by Shift
        </div>
      </Footer>
    </div>
  );
}

export default Landing;

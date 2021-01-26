import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useHistory, useLocation } from "react-router-dom";
import withSizes from "react-sizes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faThList,
  faWindowClose,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { SyncLoader } from "react-spinners";
import { Box, Button } from "@material-ui/core";

import Smologo from "../img/short-logo.png";
import Logo from "../img/logo.png";
import { ThemeContext } from "../theme";
import { login, getCategories, getFoods } from "./calls";
import {
  Header,
  InputStyle,
  LoginContainer,
  SwitchButton,
  CategoryButton,
  CategoriesContainer,
  CategoriesImageContainer,
  FoodsSection,
  FoodThumbnail,
  FoodImageThumbnail,
  FoodNameThumbnail,
  FoodPadding,
} from "./menu.styled";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Both versions of the menu

function NormalMenu({ mobile }) {
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);

  const history = useHistory();
  const { pathname: path } = useLocation();

  const categoryClickHandler = async (category) => {
    history.push(`${path}?categoria=${category}`);
    const foodCall = await getFoods(category, new Date().getDay());
    setFoods(foodCall);
  };

  useEffect(() => {
    setLoadingCategory(true);
    getCategories().then(async (result) => {
      setLoadingCategory(false);
      setCategories(result);
      if (result.length !== 0) {
        const category = result[0].text;
        if (!mobile) {
          categoryClickHandler(category);
        }
      }
    });
  }, []);

  const selectedCategory = useQuery().get("categoria");

  const CategorySection = ({ theme }) => (
    <CategoriesContainer color={theme.primary}>
      <div style={{ marginTop: "10px" }}>CATEGORÍAS</div>
      {mobile ? (
        <hr
          style={{
            color: "black",
            width: "80%",
          }}
        />
      ) : null}
      {loadingCategory ? (
        <SyncLoader size={10} style={{ top: "50%" }} />
      ) : (
        <CategoriesImageContainer>
          {categories.length !== 0 ? (
            categories.map(({ text: category, img }) => {
              return (
                <CategoryButton
                  onClick={() => {
                    categoryClickHandler(category);
                  }}
                  key={category}
                  src={img}
                  active={category === selectedCategory}
                >
                  <div
                    style={
                      mobile
                        ? {
                            color: "white",
                            fontSize: "25px",
                            fontWeight: 500,
                          }
                        : {}
                    }
                  >
                    {category}
                  </div>
                </CategoryButton>
              );
            })
          ) : (
            <div
              style={
                mobile
                  ? { textAlign: "center" }
                  : { fontSize: "16px", textAlign: "center", marginTop: "20px" }
              }
            >
              No hay categorías todavía
            </div>
          )}
        </CategoriesImageContainer>
      )}
    </CategoriesContainer>
  );

  CategorySection.propTypes = {
    theme: PropTypes.shape({
      primary: PropTypes.string,
    }),
  };

  CategorySection.defaultProps = {
    theme: {
      primary: "white",
    },
  };

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {!mobile || (mobile && !selectedCategory) ? (
            <CategorySection theme={theme} />
          ) : null}
          {!mobile || (mobile && selectedCategory) ? (
            <FoodsSection>
              {foods.length !== 0 ? (
                foods.map(({ name, description, img, id }) => (
                  <FoodPadding key={id}>
                    <FoodThumbnail>
                      <FoodImageThumbnail src={img} />
                      <FoodNameThumbnail>{name}</FoodNameThumbnail>
                    </FoodThumbnail>
                  </FoodPadding>
                ))
              ) : (
                <div>No hay comida para esta categoria</div>
              )}
            </FoodsSection>
          ) : null}
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

NormalMenu.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

function AdminMenu({ mobile }) {
  console.log(mobile);
  return (
    <div>
      admin menu
      {mobile}
    </div>
  );
}

AdminMenu.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

// Menu with the router switch and header

function Menu({ mobile }) {
  const [admin, setAdmin] = useState(false);
  const [loggingIn, setLog] = useState(false);
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  const history = useHistory();
  const { pathname: path } = useLocation();
  useEffect(() => {
    if (path === "/menu") {
      setAdmin(false);
    }
  }, [path]);

  const setLogin = (status) => {
    if (!status) {
      setUser("");
      setPass("");
    }
    setLog(status);
  };

  const switchAdmin = () => {
    if (admin) {
      history.goBack();
      setAdmin(false);
    } else {
      setLogin(true);
    }
  };

  const handleChange = (setter) => {
    return ({ target }) => {
      setter(target.value);
    };
  };

  const validate = () => {
    if (
      username.trim() !== "" &&
      password.trim() !== "" &&
      password.trim().length >= 8
    ) {
      login({ user: username, password }).then((result) => {
        if (result) {
          setAdmin(true);
          history.push(`${path}/settings`);
          setLogin(false);
          setUser("");
          setPass("");
        }
      });
    }
  };

  const searchQuery = useQuery().get("categoria");

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <>
          <Header color={theme.secondary}>
            <Link to={searchQuery && mobile ? "/menu" : "/"}>
              {searchQuery && mobile ? (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="2x"
                  style={{ margin: "8px" }}
                  color="black"
                />
              ) : (
                <img
                  src={mobile ? Smologo : Logo}
                  alt="logo"
                  height={mobile ? 40 : 35}
                  style={{ marginLeft: "10px" }}
                />
              )}
            </Link>
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0)",
                fontSize: "30px",
                fontWeight: 500,
              }}
            >
              {admin ? "ADMINISTRADOR" : "MENU"}
            </div>
            <SwitchButton
              icon={!admin ? faCog : faThList}
              onClick={switchAdmin}
            />
          </Header>
          <Switch>
            <Route exact path="/menu/settings">
              <AdminMenu mobile={mobile} />
            </Route>
            <Route exact path="/menu">
              <NormalMenu mobile={mobile} />
            </Route>
          </Switch>
          <LoginContainer active={loggingIn}>
            <img
              src={Logo}
              alt="logo"
              height={40}
              style={{ marginTop: "10px" }}
            />
            <InputStyle
              name="username"
              onChange={handleChange(setUser)}
              value={username}
              variant="outlined"
              label="Nombre de usuario"
              size="small"
              margin="normal"
            />

            <InputStyle
              type="password"
              name="password"
              onChange={handleChange(setPass)}
              variant="outlined"
              label="Contraseña"
              value={password}
              size="small"
              margin="normal"
            />

            <Button variant="contained" onClick={validate}>
              Loguearse
            </Button>
            <FontAwesomeIcon
              icon={faWindowClose}
              style={{ position: "absolute", right: 0, margin: "15px" }}
              onClick={() => {
                setLogin(false);
              }}
            />
          </LoginContainer>
        </>
      )}
    </ThemeContext.Consumer>
  );
}

Menu.propTypes = {
  mobile: PropTypes.bool.isRequired,
};

const mapSizestoProps = ({ width }) => ({
  mobile: width < 600,
});

export default withSizes(mapSizestoProps)(Menu);

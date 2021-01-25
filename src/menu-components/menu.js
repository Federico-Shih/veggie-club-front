import React, { useState, useEffect } from "react";
import {
  Link,
  Switch,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import withSizes from "react-sizes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faThList,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { SyncLoader } from "react-spinners";
import { Button } from "@material-ui/core";

import Smologo from "../img/short-logo.png";
import Logo from "../img/logo.png";
import { ThemeContext } from "../theme";
import { login, categoryCall } from "./calls";
import {
  Header,
  InputStyle,
  LoginContainer,
  SwitchButton,
  CategoryButton,
  CategoriesContainer,
  CategoriesImageContainer,
} from "./menu.styled";

// Both versions of the menu

function NormalMenu({ mobile }) {
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setCategory] = useState("");

  useEffect(() => {
    setLoadingCategory(true);
    categoryCall().then((result) => {
      setLoadingCategory(false);
      setCategories(result);
      if (result.length !== 0) {
        setCategory(result[0].text);
      }
    });
  }, []);

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <>
          <CategoriesContainer color={theme.primary}>
            <div style={{ marginTop: "10px" }}>CATEGORÍAS</div>
            {loadingCategory ? (
              <SyncLoader size={10} style={{ top: "50%" }} />
            ) : (
              <CategoriesImageContainer>
                {categories.map(({ text: category, img }) => {
                  return (
                    <CategoryButton
                      onClick={() => {
                        setCategory(category);
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
                })}
              </CategoriesImageContainer>
            )}
          </CategoriesContainer>
        </>
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

  const { path } = useRouteMatch();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/menu") {
      setAdmin(false);
    }
  }, [pathname]);

  const setLogin = (status) => {
    if (!status) {
      setUser("");
      setPass("");
    }
    setLog(status);
  };

  function switchAdmin() {
    if (admin) {
      history.goBack();
      setAdmin(false);
    } else {
      setLogin(true);
    }
  }

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

  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <>
          <Header color={theme.secondary}>
            <Link to="/">
              <img
                src={mobile ? Smologo : Logo}
                alt="logo"
                height={mobile ? 40 : 35}
                style={{ marginLeft: "10px" }}
              />
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
            <Route exact path={path}>
              <NormalMenu mobile={mobile} />
            </Route>
            <Route exact path={`${path}/settings`}>
              <AdminMenu mobile={mobile} />
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

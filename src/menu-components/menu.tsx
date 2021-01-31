import React, {
  useState,
  useEffect,
  ChangeEvent,
  ReactElement,
  useContext,
  MouseEvent,
} from "react";
import { Link, Switch, Route, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowWidth } from "@react-hook/window-size";
import {
  faCog,
  faThList,
  faWindowClose,
  faArrowLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { SyncLoader } from "react-spinners";
import { Button } from "@material-ui/core";
import { Action, Fab } from "react-tiny-fab";

import Smologo from "../img/short-logo.png";
import Logo from "../img/logo.png";
import { ThemeContext } from "../theme";
import { login, getCategories, getFoods } from "./api";
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
  FoodContainer,
  FoodImage,
  FoodTextContainer,
  FoodName,
  FoodDescription,
  CategoryText,
} from "./menu.styles";
import { FocusShadow, LoaderWrapper } from "../components/utilities";
import {
  NullFood,
  NullCategoryArray,
  NullFoodArray,
  NullCategory,
} from "./types";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Both versions of the menu
function NormalMenu() {
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(false);

  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedCategory, setCategory] = useState("");
  const [showedFood, setShowedFood] = useState(NullFood);
  const [categories, setCategories] = useState(NullCategoryArray);
  const [foods, setFoods] = useState(NullFoodArray);

  const history = useHistory();
  const { pathname: path } = useLocation();

  const categoryClickHandler = async (category: string) => {
    setLoadingFoods(true);
    history.push(`${path}?categoria=${category}`);
    setCategory(category);
    const foodCall = await getFoods(category, selectedDay);
    setFoods(foodCall);
    setLoadingFoods(false);
  };

  const stopPropagation = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };

  // Initial Loading
  useEffect(() => {
    setLoadingCategory(true);
    const asyncEffect = async () => {
      const categoryList = await getCategories();
      if (categoryList.length !== 0) {
        setCategories(categoryList);
        if (categoryList.length !== 0) {
          const category = categoryList[0].text;
          if (!mobile) {
            categoryClickHandler(category);
          }
        }
      }
      setLoadingCategory(false);
    };
    asyncEffect();
  }, []);

  const categoryQuery = useQuery().get("categoria");

  useEffect(() => {
    setLoadingFoods(true);
    const getFoodsCall = async () => {
      const foodCall = await getFoods(selectedCategory, selectedDay);
      setFoods(foodCall);
      setLoadingFoods(false);
    };

    getFoodsCall();
  }, [selectedDay]);

  const mobile = useWindowWidth() < 600;
  const foodSelected = Object.keys(showedFood).length !== 0;
  const theme = useContext(ThemeContext);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {!mobile || (mobile && !categoryQuery) ? (
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
          <LoaderWrapper
            Loader={<SyncLoader size={10} />}
            loading={loadingCategory}
          >
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
                      active={category === categoryQuery}
                    >
                      <CategoryText>{category}</CategoryText>
                    </CategoryButton>
                  );
                })
              ) : (
                <div
                  style={
                    mobile
                      ? { textAlign: "center" }
                      : {
                          fontSize: "16px",
                          textAlign: "center",
                          marginTop: "20px",
                        }
                  }
                >
                  No hay categorías todavía
                </div>
              )}
            </CategoriesImageContainer>
          </LoaderWrapper>
        </CategoriesContainer>
      ) : null}
      {!mobile || (mobile && categoryQuery) ? (
        <FoodsSection>
          <LoaderWrapper
            Loader={<SyncLoader size={10} />}
            loading={loadingFoods}
          >
            <>
              {foods.length !== 0 ? (
                foods.map(({ name, description, img, id }) => (
                  <FoodPadding key={id}>
                    <FoodThumbnail
                      onClick={() => {
                        setShowedFood({
                          name,
                          description: description ? description : "",
                          img,
                          id,
                        });
                      }}
                    >
                      <FoodImageThumbnail src={img} />
                      <FoodNameThumbnail
                        mode="single"
                        forceSingleModeWidth={false}
                      >
                        {name}
                      </FoodNameThumbnail>
                    </FoodThumbnail>
                  </FoodPadding>
                ))
              ) : (
                <div>No hay comida para esta categoria en este día</div>
              )}
            </>
          </LoaderWrapper>
        </FoodsSection>
      ) : null}
      <FocusShadow active={foodSelected} setActive={setShowedFood}>
        <FoodContainer>
          <FoodImage src={showedFood.img} onClick={stopPropagation} />
          <FoodTextContainer onClick={stopPropagation}>
            <FoodName>{showedFood.name}</FoodName>
            <hr style={{ border: `1px solid ${mobile ? "white" : "black"}` }} />
            <FoodDescription>{showedFood.description}</FoodDescription>
          </FoodTextContainer>
        </FoodContainer>
      </FocusShadow>
      <Fab
        icon={
          <FontAwesomeIcon
            size={mobile ? "1x" : "2x"}
            icon={faCalendar}
          ></FontAwesomeIcon>
        }
        event={mobile ? "click" : "hover"}
        mainButtonStyles={mobile ? {} : { width: "80px", height: "80px" }}
        alwaysShowTitle
        style={{ position: "fixed", right: 0, bottom: 0 }}
      >
        <Action
          style={selectedDay === 1 ? { color: "black" } : {}}
          onClick={() => {
            setSelectedDay(1);
          }}
          text="Lunes"
        >
          Lu
        </Action>
        <Action
          text="Mártes"
          onClick={() => {
            setSelectedDay(2);
          }}
          style={selectedDay === 2 ? { color: "black" } : {}}
        >
          Ma
        </Action>
        <Action
          text="Miércoles"
          onClick={() => {
            setSelectedDay(3);
          }}
          style={selectedDay === 3 ? { color: "black" } : {}}
        >
          Mi
        </Action>
        <Action
          text="Jueves"
          onClick={() => {
            setSelectedDay(4);
          }}
          style={selectedDay === 4 ? { color: "black" } : {}}
        >
          Ju
        </Action>
        <Action
          text="Viernes"
          onClick={() => {
            setSelectedDay(5);
          }}
          style={selectedDay === 5 ? { color: "black" } : {}}
        >
          Vi
        </Action>
        <Action
          text="Sábado"
          onClick={() => {
            setSelectedDay(6);
          }}
          style={selectedDay === 6 ? { color: "black" } : {}}
        >
          Sa
        </Action>
      </Fab>
    </div>
  );
}

function AdminMenu() {
  return <div>admin menu</div>;
}

// Menu with the router switch and header
function Menu(): ReactElement {
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

  const setLogin = (status: boolean) => {
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

  function handleChange(
    setter: (arg: string) => void
  ): ({ target }: ChangeEvent<HTMLInputElement>) => void {
    return ({ target }) => {
      setter(target.value);
    };
  }

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

  const mobile = useWindowWidth() < 600;
  const searchQuery = useQuery().get("categoria");
  const theme = useContext(ThemeContext);

  return (
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
        <SwitchButton icon={!admin ? faCog : faThList} onClick={switchAdmin} />
      </Header>
      <Switch>
        <Route exact path="/menu/settings">
          <AdminMenu />
        </Route>
        <Route exact path="/menu">
          <NormalMenu />
        </Route>
      </Switch>
      <LoginContainer active={loggingIn}>
        <img src={Logo} alt="logo" height={40} style={{ marginTop: "10px" }} />
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
  );
}

export default Menu;

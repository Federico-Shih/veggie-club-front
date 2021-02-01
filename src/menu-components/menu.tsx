import React, {
  useState,
  useEffect,
  ChangeEvent,
  ReactElement,
  useContext,
  MouseEvent,
  createContext,
} from "react";
import { Link, Switch, Route, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon as FAIcon } from "@fortawesome/react-fontawesome";
import { useWindowWidth } from "@react-hook/window-size";
import {
  faCog,
  faWindowClose,
  faArrowLeft,
  faCalendar,
  faBars,
  faSignOutAlt,
  faThList,
} from "@fortawesome/free-solid-svg-icons";
import { SyncLoader } from "react-spinners";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Backdrop,
} from "@material-ui/core";
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
  AddCategoryButton,
} from "./menu.styles";
import { LoaderWrapper } from "../components/utilities";
import { useCategoryEditor } from "./hooks";
import {
  NullFood,
  NullCategoryArray,
  NullFoodArray,
  NullCategory,
  Category,
} from "./types";
import { CategoryEditor } from "./components";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DrawerContext = createContext({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDrawer: (_: boolean): void => {},
});

type DaySelectorProps = {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
};

const DaySelector = ({ selectedDay, setSelectedDay }: DaySelectorProps) => {
  const mobile = useWindowWidth() < 600;

  return (
    <Fab
      icon={<FAIcon size={mobile ? "1x" : "2x"} icon={faCalendar}></FAIcon>}
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
  );
};

// User menu component
function NormalMenu() {
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(false);

  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedCategory, setCategory] = useState(NullCategory);
  const [showedFood, setShowedFood] = useState(NullFood);
  const [categories, setCategories] = useState(NullCategoryArray);
  const [foods, setFoods] = useState(NullFoodArray);

  const history = useHistory();
  const { pathname: path } = useLocation();

  const categoryClickHandler = async (category: Category) => {
    setLoadingFoods(true);
    history.push(`${path}?categoria=${category.text}`);
    setCategory(category);
    const foodCall = await getFoods(category.id, selectedDay);
    setFoods(foodCall);
    setLoadingFoods(false);
  };

  // Initial Loading
  useEffect(() => {
    setLoadingCategory(true);
    const asyncEffect = async () => {
      const categoryList = await getCategories();
      if (categoryList.length !== 0) {
        setCategories(categoryList);
        if (categoryList.length !== 0) {
          if (!mobile) {
            categoryClickHandler(categoryList[0]);
          }
        }
      }
      setLoadingCategory(false);
    };
    asyncEffect();
  }, []);
  const stopPropagation = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
  };

  const categoryQuery = useQuery().get("categoria");

  useEffect(() => {
    setLoadingFoods(true);
    const getFoodsCall = async () => {
      const foodCall = await getFoods(selectedCategory.id, selectedDay);
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
                categories.map((categoryTemp) => {
                  const { text, img, id } = categoryTemp;
                  return (
                    <CategoryButton
                      onClick={() => {
                        categoryClickHandler(categoryTemp);
                      }}
                      key={id}
                      src={img}
                      active={id === selectedCategory.id}
                    >
                      <CategoryText>{text}</CategoryText>
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
      <Backdrop
        open={foodSelected}
        onClick={() => {
          setShowedFood(NullFood);
        }}
        style={{ zIndex: 1000 }}
      >
        <FoodContainer>
          <FoodImage src={showedFood.img} onClick={stopPropagation} />
          <FoodTextContainer onClick={stopPropagation}>
            <FoodName>{showedFood.name}</FoodName>
            <hr style={{ border: `1px solid ${mobile ? "white" : "black"}` }} />
            <FoodDescription>{showedFood.description}</FoodDescription>
          </FoodTextContainer>
        </FoodContainer>
      </Backdrop>
      <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
    </div>
  );
}

// Admin menu component;
function AdminMenu() {
  const { open, toggleDrawer } = useContext(DrawerContext);
  const history = useHistory();
  const mobile = useWindowWidth() < 600;
  const { pathname: path } = useLocation();

  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingFoods, setLoadingFoods] = useState(false);

  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedCategory, setCategory] = useState(NullCategory);
  // const [showedFood, setShowedFood] = useState(NullFood);
  const [categories, setCategories] = useState(NullCategoryArray);
  const [foods, setFoods] = useState(NullFoodArray);
  const [
    { show: editorShown, category: editedCategory },
    setCategoryEditor,
  ] = useCategoryEditor({
    show: false,
  });

  const categoryClickHandler = async (category: Category) => {
    setLoadingFoods(true);
    history.push(`${path}?categoria=${category.text}`);
    setCategory(category);
    const foodCall = await getFoods(category.id, selectedDay);
    setFoods(foodCall);
    setLoadingFoods(false);
  };

  // Initial Loading
  useEffect(() => {
    setLoadingCategory(true);
    const asyncEffect = async () => {
      const categoryList = await getCategories();
      if (categoryList.length !== 0) {
        setCategories(categoryList);
        if (categoryList.length !== 0) {
          if (!mobile) {
            categoryClickHandler(categoryList[0]);
          }
        }
      }
      setLoadingCategory(false);
    };
    asyncEffect();
  }, []);

  const categoryQuery = useQuery().get("categoria");
  const theme = useContext(ThemeContext);

  return (
    <>
      <Switch>
        <Route exact path="/menu/settings">
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
                      <>
                        {categories.map((categoryTemp) => {
                          const { text, img, id } = categoryTemp;
                          return (
                            <CategoryButton
                              onClick={() => {
                                categoryClickHandler(categoryTemp);
                              }}
                              key={id}
                              src={img}
                              active={id === selectedCategory.id}
                            >
                              <CategoryText>{text}</CategoryText>
                            </CategoryButton>
                          );
                        })}
                        <AddCategoryButton
                          onClick={() => {
                            setCategoryEditor({ show: true });
                          }}
                        >
                          +
                        </AddCategoryButton>
                      </>
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
          </div>
        </Route>
      </Switch>
      <Drawer
        open={open}
        onClose={() => {
          toggleDrawer(false);
        }}
      >
        <Link to="/menu/settings">
          <List style={{ width: "200px" }}>
            <ListItem button>
              <ListItemIcon>
                <FAIcon size="lg" icon={faThList} />
              </ListItemIcon>
              <ListItemText primary={"Menu"} />
            </ListItem>
          </List>
        </Link>
      </Drawer>
      <Backdrop
        open={editorShown}
        onClick={() => {
          setCategoryEditor({ show: false });
        }}
        style={{ zIndex: 1000 }}
      >
        <CategoryEditor category={editedCategory as Category} />
      </Backdrop>
    </>
  );
}

// Menu with the router switch and header
function Menu(): ReactElement {
  // Switches to admin tab
  const [admin, setAdmin] = useState(false);

  // Activates log in popup
  const [loggingIn, setLog] = useState(false);

  // Login info
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");

  // Activates drawer
  const [activeDrawer, setActiveDrawer] = useState(false);

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
      history.push("/menu");
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

  const MainIcon = (): ReactElement => {
    if (searchQuery && mobile) {
      return (
        <FAIcon
          icon={faArrowLeft}
          size="2x"
          style={{ margin: "8px" }}
          color="black"
          onClick={() => {
            history.goBack();
          }}
        />
      );
    }

    if (path.split("/").includes("settings")) {
      return (
        <FAIcon
          icon={faBars}
          size="2x"
          style={{ margin: "8px" }}
          color="black"
          onClick={() => {
            setActiveDrawer(!activeDrawer);
          }}
        ></FAIcon>
      );
    }

    return (
      <Link to="/">
        <img
          src={mobile ? Smologo : Logo}
          alt="logo"
          height={mobile ? 40 : 35}
          style={{ marginLeft: "10px" }}
        />
      </Link>
    );
  };

  return (
    <>
      <Header color={theme.secondary}>
        <MainIcon />
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, 0)",
            fontSize: mobile ? "20px" : "30px",
            fontWeight: 500,
          }}
        >
          {admin ? "ADMINISTRADOR" : "MENU"}
        </div>
        <SwitchButton
          icon={!admin ? faCog : faSignOutAlt}
          onClick={switchAdmin}
        />
      </Header>
      <Switch>
        <Route exact path="/menu/settings">
          <DrawerContext.Provider
            value={{ toggleDrawer: setActiveDrawer, open: activeDrawer }}
          >
            <AdminMenu />
          </DrawerContext.Provider>
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
        <FAIcon
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

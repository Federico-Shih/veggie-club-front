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
  faEdit,
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
import {
  login,
  getCategories,
  getFoodsByDayAndCategory,
  createCategory,
  modifyCategory,
  createFood,
  modifyFood,
  deleteCategory,
} from "./api";
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
import { useCategoryEditor, useFoodEditor } from "./hooks";
import {
  NullFood,
  NullCategoryArray,
  NullFoodArray,
  NullCategory,
  Category,
} from "./types";
import { CategoryEditor, FoodEditor } from "./menu.components";
import { CategoryNotSavedError, FoodNotSavedError } from "./errors";
import { Food, Days } from "./types";
import { deleteFood } from "./api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DrawerContext = createContext({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDrawer: (_: boolean): void => {},
});

const stopPropagation = (e: MouseEvent<HTMLImageElement>) => {
  e.stopPropagation();
};

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

  const [selectedDay, setDay] = useState(new Date().getDay());
  const [selectedCategory, setCategory] = useState(NullCategory);
  const [showedFood, setShowedFood] = useState(NullFood);
  const [categories, setCategories] = useState(NullCategoryArray);
  const [foods, setFoods] = useState(NullFoodArray);

  const history = useHistory();
  const { pathname: path } = useLocation();

  const categoryClickHandler = async (category: Category, day?: Days) => {
    setLoadingFoods(true);
    history.push(`${path}?categoria=${category.name}`);
    setCategory(category);
    const foodCall = await getFoodsByDayAndCategory(
      category.id,
      day ?? selectedDay
    );
    setFoods(foodCall);
    setLoadingFoods(false);
  };

  // Initial Loading
  useEffect(() => {
    setLoadingCategory(true);
    const asyncEffect = async () => {
      const categoryList = await getCategories();
      setCategories(categoryList);
      if (categoryList.length !== 0) {
        if (!mobile) {
          categoryClickHandler(categoryList[0]);
        }
      }
      setLoadingCategory(false);
    };
    try {
      asyncEffect();
    } catch (err) {
      console.error(err);
      // TO IMPLEMENT ERROR HANDLING
    }
  }, []);

  const categoryQuery = useQuery().get("categoria");

  const setSelectedDay = async (day: Days) => {
    setDay(day);
    setLoadingFoods(true);
    const foodCall = await getFoodsByDayAndCategory(selectedCategory.id, day);
    setFoods(foodCall);
    setLoadingFoods(false);
  };

  // useEffect(() => {
  //   setLoadingFoods(true);
  //   const getFoodsCall = async () => {
  //     const foodCall = await getFoodsByDayAndCategory(
  //       selectedCategory.id,
  //       selectedDay
  //     );
  //     setFoods(foodCall);
  //     setLoadingFoods(false);
  //   };

  //   getFoodsCall();
  // }, [selectedDay]);

  const mobile = useWindowWidth() < 600;
  const foodSelected = showedFood.image !== "";
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
                  const { name, image, id } = categoryTemp;
                  return (
                    <CategoryButton
                      onClick={() => {
                        categoryClickHandler(categoryTemp);
                      }}
                      key={id}
                      src={image}
                      active={id === selectedCategory.id}
                    >
                      <CategoryText>{name}</CategoryText>
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
                foods.map(({ name, description, image, id, days }) => (
                  <FoodPadding key={id}>
                    <FoodThumbnail
                      onClick={() => {
                        setShowedFood({
                          name,
                          description,
                          days,
                          image,
                          id,
                          visible: true,
                        });
                      }}
                    >
                      <FoodImageThumbnail src={image} />
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
          <FoodImage src={showedFood.image} onClick={stopPropagation} />
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

  const [selectedCategory, setCategory] = useState(NullCategory);
  const [categories, setCategories] = useState([] as Category[]);
  const [foods, setFoods] = useState(NullFoodArray);

  // Category and Food's editor
  const [
    { show: categoryEditorShown, category: editedCategory },
    setCategoryEditor,
  ] = useCategoryEditor({
    show: false,
  });

  const [
    { show: foodEditorShown, food: editedFood },
    setShowedFood,
  ] = useFoodEditor({ show: false });

  const categoryClickHandler = async (category: Category) => {
    setLoadingFoods(true);

    // Used for mobile back functionality
    history.push(`${path}?categoria=${category.name}`);
    setCategory(category);
    const foodCall = await getFoodsByDayAndCategory(category.id);
    setFoods(foodCall);
    setLoadingFoods(false);
  };

  // Initial Loading
  useEffect(() => {
    setLoadingCategory(true);
    const asyncEffect = async () => {
      const categoryList = await getCategories();
      setCategories(categoryList);
      if (categoryList.length !== 0) {
        if (!mobile) {
          categoryClickHandler(categoryList[0]);
        }
      }
      setLoadingCategory(false);
    };
    try {
      asyncEffect();
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Function passed to category editor component
  const onCategorySave = async (savedCategory: Category) => {
    const { image, name, id } = savedCategory;
    if (id === "-1") {
      const newCategory = await createCategory(name, image);
      if (newCategory) {
        const newCategoryList = [...categories];
        newCategoryList.push(newCategory);
        setCategories(newCategoryList);
      } else {
        throw new CategoryNotSavedError();
      }
      return Promise.resolve(newCategory);
    } else {
      let modifiedCategory;
      if (savedCategory.image === editedCategory?.image) {
        modifiedCategory = await modifyCategory({
          id: savedCategory.id,
          name: savedCategory.name,
        });
      } else {
        modifiedCategory = await modifyCategory(savedCategory);
      }
      if (modifiedCategory) {
        const newCategoryList = [...categories];
        for (let i = 0; i < newCategoryList.length; i += 1) {
          if (newCategoryList[i].id === modifiedCategory.id) {
            newCategoryList[i] = modifiedCategory;
            break;
          }
        }
        setCategories(newCategoryList);
      } else {
        throw new CategoryNotSavedError();
      }
      return Promise.resolve(modifiedCategory);
    }
  };

  const onFoodSave = async (savedFood: Food) => {
    const { image, name, description, id, days, visible } = savedFood;
    if (id === "-1") {
      const newFood = await createFood(
        { image, name, description, days, visible },
        selectedCategory.id
      );
      if (newFood) {
        const newFoodList = [...foods];
        newFoodList.push(newFood);
        setFoods(newFoodList);
      } else {
        throw new FoodNotSavedError();
      }
      return Promise.resolve(newFood);
    } else {
      const modifiedFood = await modifyFood(savedFood, editedFood as Food);
      if (modifiedFood) {
        const newFoodList = [...foods];
        for (let i = 0; i < newFoodList.length; i += 1) {
          if (newFoodList[i].id === modifiedFood.id) {
            newFoodList[i] = modifiedFood;
            break;
          }
        }
        setFoods(newFoodList);
      } else {
        throw new FoodNotSavedError();
      }
      return Promise.resolve(savedFood);
    }
  };

  const onFoodDelete = async (foodId: string) => {
    await deleteFood(foodId);
    const newFoods = foods.filter((food) => food.id !== foodId);
    setFoods(newFoods);
    setShowedFood({ show: false });
  };

  const onCategoryDelete = async (categoryId: string) => {
    await deleteCategory(categoryId);
    const newCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(newCategories);
    setCategoryEditor({ show: false });
  };

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
                          const { name, image, id } = categoryTemp;
                          return (
                            <CategoryButton
                              onClick={() => {
                                categoryClickHandler(categoryTemp);
                              }}
                              key={id}
                              src={image}
                              active={id === selectedCategory.id}
                              style={{ position: "relative" }}
                            >
                              <CategoryText>{name}</CategoryText>
                              <FAIcon
                                size="lg"
                                icon={faEdit}
                                onClick={(e) => {
                                  // To avoid clicking the category button
                                  e.stopPropagation();
                                  setCategoryEditor({
                                    show: true,
                                    category: categoryTemp,
                                  });
                                }}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  margin: 10,
                                }}
                                color={mobile ? "white" : "black"}
                              />
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
            {!mobile || (mobile && categoryQuery) ? (
              <FoodsSection>
                <LoaderWrapper
                  Loader={<SyncLoader size={10} />}
                  loading={loadingFoods}
                >
                  <>
                    {foods.length !== 0 ? (
                      foods.map(
                        ({ name, description, image, id, days, visible }) => (
                          <FoodPadding key={id}>
                            <FoodThumbnail
                              onClick={() => {
                                setShowedFood({
                                  show: true,
                                  food: {
                                    name,
                                    description: description ? description : "",
                                    image,
                                    id,
                                    days,
                                    visible,
                                  },
                                });
                              }}
                            >
                              <FoodImageThumbnail src={image} />
                              <FoodNameThumbnail
                                mode="single"
                                forceSingleModeWidth={false}
                              >
                                {name}
                              </FoodNameThumbnail>
                            </FoodThumbnail>
                          </FoodPadding>
                        )
                      )
                    ) : (
                      <></>
                    )}
                    <FoodPadding>
                      <FoodThumbnail
                        style={{
                          height: 150,
                          fontSize: 80,
                          border: "4px solid black",
                        }}
                        onClick={() => {
                          setShowedFood({ show: true });
                        }}
                      >
                        +
                      </FoodThumbnail>
                    </FoodPadding>
                  </>
                </LoaderWrapper>
              </FoodsSection>
            ) : null}
            <Backdrop
              open={categoryEditorShown}
              onClick={() => {
                setCategoryEditor({ show: false });
              }}
              style={{ zIndex: 1000 }}
            >
              <CategoryEditor
                onDelete={onCategoryDelete}
                onSave={onCategorySave}
                category={editedCategory as Category}
              />
            </Backdrop>
            <Backdrop
              open={foodEditorShown}
              onClick={() => {
                setShowedFood({ show: false });
              }}
              style={{ zIndex: 1000 }}
            >
              <FoodEditor
                food={editedFood as Food}
                onSave={onFoodSave}
                onDelete={onFoodDelete}
              />
            </Backdrop>
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
    </>
  );
}

// Menu with the router switch and header
function Menu(): ReactElement {
  // Activates log in popup
  const [loggingIn, setLog] = useState(false);
  // Login info
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  // Activates drawer
  const [activeDrawer, setActiveDrawer] = useState(false);
  const history = useHistory();
  const { pathname: path } = useLocation();

  // useEffect(() => {
  //   if (path === "/menu") {
  //     setAdmin(false);
  //   }
  // }, [path]);

  const setLogin = (status: boolean) => {
    if (!status) {
      setUser("");
      setPass("");
    }
    setLog(status);
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

  const admin = path === "/menu/settings";

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
          onClick={() => {
            if (admin) {
              history.push("/menu");
            } else {
              setLog(true);
            }
          }}
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
      <Backdrop
        open={loggingIn}
        onClick={() => {
          setLogin(false);
        }}
        style={{ zIndex: 1001 }}
      >
        <LoginContainer
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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
          <FAIcon
            icon={faWindowClose}
            style={{
              position: "absolute",
              right: 0,
              margin: "15px",
            }}
            onClick={() => {
              setLogin(false);
            }}
          />
        </LoginContainer>
      </Backdrop>
    </>
  );
}

export default Menu;

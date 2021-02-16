import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";

import { ThemeContext, themes } from "./theme";
import Landing from "./landing";
import Menu from "./menu/menu";
import { AlertLevel } from "./types";
import { AlertContext } from "./events";
import { Alert } from "@material-ui/lab";

function App(): React.ReactElement {
  const [alertMessage, setAlert] = useState({
    message: "",
    level: AlertLevel.info,
  });

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ message: "", level: AlertLevel.info });
  };

  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeContext.Provider value={themes.light}>
          <AlertContext.Provider value={{ ...alertMessage, setAlert }}>
            <Router>
              <Switch>
                <Route path="/menu">
                  <Menu />
                </Route>
                <Route path="/">
                  <Landing />
                </Route>
              </Switch>
            </Router>
          </AlertContext.Provider>
          <Snackbar
            open={alertMessage.message !== ""}
            autoHideDuration={2000}
            onClose={handleAlertClose}
          >
            <Alert onClose={handleAlertClose} severity={alertMessage.level}>
              {alertMessage.message}
            </Alert>
          </Snackbar>
        </ThemeContext.Provider>
      </StylesProvider>
    </div>
  );
}

export default App;

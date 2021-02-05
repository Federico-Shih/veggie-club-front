import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeContext, themes } from "./theme";
import Landing from "./landing";
import Menu from "./menu/menu";
import { StylesProvider } from "@material-ui/core/styles";

function App(): React.ReactElement {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeContext.Provider value={themes.light}>
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
        </ThemeContext.Provider>
      </StylesProvider>
    </div>
  );
}

export default App;

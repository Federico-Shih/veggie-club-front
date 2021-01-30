import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeContext, themes } from "./theme";
import Landing from "./landing";
import Menu from "./menu-components/menu";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;

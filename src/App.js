import "./App.css";
import { Provider } from "react-redux";
import Login from "./components/Login/login";
import store from "./redux/store/store";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import ManagePassword from "./components/Dashboard/managePassword";

function App() {
  return (
    <Provider store={store}>
      <div id="loader-div">
        <div id="loader"></div>
      </div>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/manage-password">
              <ManagePassword />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header/index";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import News from "./containers/News/News";
import Statistics from "./containers/Statistics/Statistics";
import Profile from "./containers/Profile/Profile";
import ProtectedRoute from "./authentication/protected.route";
import useToken from "./authentication/useToken";
import Market from "./containers/Market/Market";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const history = createBrowserHistory();
  const { token, setToken, removeToken } = useToken();

  return (
    <div>
      <Provider store={store}>
        <Router history={history}>
          <Header className="header" />
          <Switch>
            <Route path="/login" exact>
              <Login setToken={setToken} />
            </Route>
            <Route path="/logout" onClick={removeToken} exact></Route>
            <ProtectedRoute
              path="/statistics"
              exact
              component={Statistics}
              token={token}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              exact
              component={Profile}
              token={token}
            ></ProtectedRoute>
            <Route path="/signup">
              <SignUp />
            </Route>
            <ProtectedRoute
              path="/market"
              exact
              component={Market}
              token={token}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/news"
              exact
              component={News}
              token={token}
            ></ProtectedRoute>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

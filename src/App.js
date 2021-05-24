import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import Header from "./components/Header/index";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Home from "./containers/Home/Home";
import News from "./containers/News/News";
import Profile from "./containers/Profile/Profile";
import ProtectedRoute from "./authentication/protected.route";
import useToken from "./authentication/useToken";
import Market from "./containers/Market/Market";

export default function App() {
  const history = createBrowserHistory();
  const { token, setToken, removeToken } = useToken();

  return (
    <div>
      <Router history={history}>
        <Header className="header" />
        <Switch>
          <Route path="/home" exact component={Home}></Route>
          <Redirect from="/" to="/login" exact />
          <Route path="/login" exact>
            <Login setToken={setToken} />
          </Route>
          <Route path="/logout" onClick={removeToken} exact></Route>
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
        </Switch>
      </Router>
      <News />
    </div>
  );
}

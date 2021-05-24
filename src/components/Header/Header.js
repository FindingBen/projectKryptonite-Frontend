import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./Header.css";
import useToken from "../../authentication/useToken";

function Header({ history }) {
  const checkToken = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { removeToken } = useToken();
  // useEffect(() => {
  //   if (checkToken) {
  //     setIsLoggedIn(true);
  //   }
  // });

  const handleClick = (route) => {
    history.push(`${route}`);
  };

  return (
    <div id="navHeader">
      <nav class="navbar navbar-expand-md navbar-dark bg-transparent">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  onClick={() => handleClick("home")}
                >
                  <h4>Home</h4>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" onClick={() => handleClick("market")}>
                  <h4>Market</h4>
                </a>
              </li>
              {sessionStorage.getItem("token") ? (
                <li class="nav-item">
                  <a
                    class="nav-link"
                    aria-current="page"
                    onClick={() => handleClick("profile")}
                  >
                    <h4>Profile</h4>
                  </a>
                </li>
              ) : null}

              <li class="nav-item">
                <a class="nav-link" onClick={() => handleClick("signup")}>
                  <h4>Sign up</h4>
                </a>
              </li>
              {sessionStorage.getItem("token") ? (
                <li class="nav-item">
                  <a class="nav-link" onClick={() => removeToken()}>
                    <h4>Sign out</h4>
                  </a>
                </li>
              ) : (
                <li class="nav-item">
                  <a class="nav-link" onClick={() => handleClick("login")}>
                    <h4>Sign in</h4>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Header);

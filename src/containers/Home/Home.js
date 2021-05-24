import { useState } from "react";
import { withRouter } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import React, { useEffect } from "react";

function Home({ getUser }) {
  var tokenAuth = sessionStorage.getItem("token");
  //const [user, setUser] = useState();
  // async function getUser() {
  //   await fetch(`http://127.0.0.1:8000/api/v1/accounts/user`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "X-ACCESS-TOKEN": tokenAuth,
  //     },
  //   })
  //     // .then((data) => setUser(data.json()))
  //     .then((data) => data.json())
  //     .then((data) => setUser(data));
  // }

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <div className="homeWrapper">
      <h1>Earn</h1>
      <h1>Anything</h1>
      <h4>
        Introducing the work collection, a line of the new era of earning money
        from cryptocurrencies that will change your life.
      </h4>
    </div>
  );
}

export default withRouter(Home);

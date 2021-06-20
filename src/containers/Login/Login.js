import React from "react";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import "./Login.css";

async function loginUser(userData) {
  return fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),
  })
    .then((data) => data.json())
    .then((data) => sessionStorage.setItem("token", data.access));
}

export default function Login({ setToken }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    const isSuccessful = await setToken(token);
    if (!isSuccessful) {
      setResponseMsg("Not valid creds!");
    } else {
      setIsLoggedIn(true);
    }
  };

  if (isLoggedIn) {
    history.push("/market");
  }

  return (
    <div className="loginWrapper">
      <form onSubmit={handleLogin} class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <hr />
        <input
          type="email"
          id="email"
          class="form-control"
          placeholder="Email"
          required
          autofocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr />
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; Made by Krypto team</p>
      </form>
    </div>
  );
}

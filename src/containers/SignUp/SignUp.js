import React, { useState } from "react";
import "./SignUp.css";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import { useHistory, Redirect } from "react-router-dom";

async function signupUser(userData) {
  return fetch("http://127.0.0.1:8000/api/v1/accounts/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((data) => data.json());
}

export default function SignUp() {
  const initialState = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    emailError: "",
    nameError: "",
    userError: "",
    lastError: "",
    passwordError: "",
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setlastName] = useState("");
  const [password, setPassword] = useState("");

  let [emailError, setEmailErr] = useState("");
  let [nameError, setNameErr] = useState("");
  let [userError, setUserErr] = useState("");
  let [lastNError, setLastNameErr] = useState("");
  let [passwordError, setPassErr] = useState("");

  const history = useHistory();

  function validate() {
    //let emailError = "";
    if (first_name.length > 15) {
      nameError = "The name exceeds character limit!";
      setNameErr(nameError);
      return false;
    }
    if (last_name.length > 15) {
      lastNError = "The name exceeds character limit!";
      setLastNameErr(lastNError);
      return false;
    }

    if (password.length < 8) {
      passwordError = "Must be at least 8 characters!";
      setPassErr(passwordError);
      return false;
    }

    if (username.length > 8) {
      userError = "Username cannot be more then 8 characters long!";
      setUserErr(userError);
      return false;
    }

    if (!email.includes("@")) {
      emailError = "Invalid email";
      setEmailErr(emailError);
      return false;
    }

    return true;
  }
  console.log(nameError);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      await signupUser({
        username,
        first_name,
        last_name,
        email,
        password,
      });
      history.push("/login");
    }
  };

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();

  return (
    <div className="wrapperSignUp">
      <form class="form-signin" onSubmit={handleSubmit}>
        <h1 class="h3 mb-3 font-weight-normal">Please sign up below</h1>
        <hr></hr>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ fontSize: 15, color: "red" }}>{emailError}</div>
        <hr></hr>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ fontSize: 15, color: "red" }}>{passwordError}</div>
        <hr></hr>
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <div style={{ fontSize: 15, color: "red" }}>{userError}</div>
        <hr></hr>
        <input
          type="text"
          id="first_name"
          class="form-control"
          placeholder="first name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <div style={{ fontSize: 15, color: "red" }}>{nameError}</div>
        <hr></hr>
        <input
          type="text"
          id="last_name"
          class="form-control"
          placeholder="last name"
          required
          onChange={(e) => setlastName(e.target.value)}
        />
        <div style={{ fontSize: 15, color: "red" }}>{lastNError}</div>
        <hr></hr>
        <Button variant="contained" color="primary" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [birth_date, setDate] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupUser({
      username,
      first_name,
      last_name,
      email,
      password,
      birth_date,
    });
    history.push("/login");
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
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr></hr>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <hr></hr>
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <hr></hr>
        <input
          type="text"
          id="first_name"
          class="form-control"
          placeholder="first name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <hr></hr>
        <input
          type="text"
          id="last_name"
          class="form-control"
          placeholder="last name"
          required
          onChange={(e) => setlastName(e.target.value)}
        />
        <hr></hr>
        <TextField
          type="date"
          id="last_name"
          className={classes.textField}
          required
          onChange={(e) => setDate(e.target.value)}
        />
        <hr></hr>
        <Button variant="contained" color="primary" type="submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}

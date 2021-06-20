import { withRouter } from "react-router-dom";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  var tokenAuth = sessionStorage.getItem("token");
  const [user, setUser] = useState();
  async function getUser() {
    fetch(`http://127.0.0.1:8000/api/v1/accounts/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => setUser(data));
  }

  async function updateUser(userData) {
    fetch(`http://127.0.0.1:8000/api/v1/accounts/update`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
      body: JSON.stringify(userData),
    }).then((data) => data.json());
  }

  const [city, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [bank_employee, setBankEmployee] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser({
      city,
      country,
      bank_employee,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profileUpdateDiv">
      <form onSubmit={handleUpdate} class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Update your information</h1>
        <hr />
        <input
          type="text"
          id="text"
          class="form-control"
          placeholder="Country of residence"
          autofocus
          onChange={(e) => setCountry(e.target.value)}
        />
        <hr />
        <input
          type="text"
          id="text"
          class="form-control"
          placeholder="Bank employee"
          onChange={(e) => setBankEmployee(e.target.value)}
        />
        <br></br>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Update
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; Made by Krypto team</p>
      </form>
    </div>
  );
}

export default withRouter(Profile);

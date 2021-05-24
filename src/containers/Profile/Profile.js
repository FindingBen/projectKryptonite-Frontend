import { withRouter } from "react-router-dom";
import "./Profile.css";
import React, { useEffect, useState } from "react";

function Profile({ getUser }) {
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
    fetch("http://127.0.0.1:8000/api/v1/accounts/update", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
      body: JSON.stringify(userData),
    }).then((data) => data.json());
  }

  async function createBankAccount(userData) {
    fetch("http://127.0.0.1:8000/api/v1/portfolio/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
      body: JSON.stringify(userData),
    }).then((data) => data.json());
  }

  useEffect(() => {
    getUser();
  }, []);
  //For user update
  const [city, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [bank_employee, setBankEmployee] = useState("");

  //For bank account
  const [balance, setBalance] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser({
      city,
      country,
      bank_employee,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createBankAccount({
      balance,
    });
  };

  return (
    <div className="mainProfileWrapper">
      <div className="profileWrapper">
        <form onSubmit={handleUpdate} class="form-signin">
          <h1 class="h3 mb-3 font-weight-normal">Your information</h1>
          <input
            type="text"
            class="form-control"
            placeholder="City"
            onChange={(e) => setAddress(e.target.value)}
          />
          <hr></hr>
          <input
            type="text"
            class="form-control"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <hr></hr>
          <input
            type="text"
            class="form-control"
            placeholder="Your bank employee"
            onChange={(e) => setBankEmployee(e.target.value)}
          />
          <hr></hr>
          <button type="submit" class="btn btn-primary">
            Update
          </button>
        </form>
      </div>
      <div className="bankWrapper">
        <form onSubmit={handleCreate} className="bankForm">
          <h1 class="h3 mb-3 font-weight-normal">Open bank account</h1>
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              placeholder="Enter your balance"
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <hr></hr>
          <button type="submit" class="btn btn-primary">
            Link card
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Profile);

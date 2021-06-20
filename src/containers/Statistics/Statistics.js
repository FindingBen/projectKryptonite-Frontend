import { withRouter } from "react-router-dom";
import "./Statistics.css";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Doughnut, Bar } from "react-chartjs-2";

function Profile({ getUser }) {
  var tokenAuth = sessionStorage.getItem("token");
  const [user, setUser] = useState();
  const [transactions, setTransactions] = useState();
  const [chartData, setChartData] = useState();
  const [barChartData, setBarChartData] = useState();
  let coin_number = [];
  let trading_ratio = [];
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

  async function getTransactions() {
    fetch(`http://127.0.0.1:8000/api/v1/portfolio/list/transactions`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => setTransactions(data));
  }

  async function getStatistic() {
    fetch("http://127.0.0.1:8000/api/v1/portfolio/list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        coin_number.push(data.bitcoin);
        coin_number.push(data.teether);
        coin_number.push(data.etherum);
        coin_number.push(data.binance);
        coin_number.push(data.cardano);

        setChartData({
          labels: ["Bitcoin", "Tether", "Ethereum", "Binance Coin", "Cardano"],
          color: ["rgba(255,255,255, 3.0)"],
          datasets: [
            {
              label: "Coin value",
              data: coin_number,
              backgroundColor: [
                "rgb(168, 130, 34)",
                "rgb(30, 130, 118)",
                "rgb(57, 36, 79)",
                "rgb(21, 99, 110)",
                "rgb(95, 115, 130)",
              ],
              borderColor: ["rgba(255,255,255, 1.9)"],
            },
          ],
        });
      });
  }

  function purchaseStatistics() {
    fetch("http://127.0.0.1:8000/api/v1/portfolio/list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        trading_ratio.push(data.buy_trade);
        trading_ratio.push(data.sell_trade);

        setBarChartData({
          labels: ["Buy trade", "Sell trade"],
          color: ["rgba(255,255,255, 8.0)"],
          datasets: [
            {
              label: "Trading ration",
              data: trading_ratio,
              backgroundColor: ["rgb(0, 204, 0)", "rgb(255, 0, 0)"],
              borderColor: ["rgba(255,255,255, 1.9)"],
            },
          ],
        });
      });
  }

  useEffect(() => {
    getStatistic();
    getUser();
    getTransactions();
    purchaseStatistics();
  }, []);

  return (
    <div className="mainProfileWrapper">
      <div className="profileWrapper">
        {chartData ? (
          <Doughnut
            data={chartData}
            title="My amazing data"
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
            color="#70CAD1"
          />
        ) : (
          <h4>No data yet</h4>
        )}
      </div>
      <div className="purchaseStatistics">
        {chartData ? (
          <Bar
            data={barChartData}
            title="My amazing data"
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
            color="#70CAD1"
          />
        ) : (
          <h4>No data yet</h4>
        )}
      </div>

      <div className="transactionWrapper">
        <h3>Portfolio history</h3>
        <hr></hr>
        {transactions &&
          transactions.map((object) => {
            return (
              <div className="listTransactions">
                <div className="transaction">Ammount: {object.ammount}</div>
                <div className="transaction">
                  Type: {object.transaction_type}
                </div>
                <div className="transaction">
                  Date created: {object.date_created}
                </div>
                <div className="transaction">Isin number: {object.isin}</div>
                <br></br>
                <hr></hr>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default withRouter(Profile);

import React from "react";
import { withRouter } from "react-router-dom";
import "./Market.css";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import axios from "axios";
function Market({ getCoins }) {
  var tokenAuth = sessionStorage.getItem("token");
  const [coins, setCoins] = useState();
  const [chartData, setChartData] = useState();
  const [balance, setBalance] = useState();
  async function getPrices(text) {
    let coin_price = [];
    fetch(`http://127.0.0.1:8000/api/v1/market/retrieve/?name=${text}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => {
        coin_price.push(data.current_price);
        coin_price.push(data.second_price);
        coin_price.push(data.third_price);
        coin_price.push(data.fourth_price);
        coin_price.push(data.fifth_price);
        console.log(coin_price);
        setChartData({
          labels: [
            "5 days ago",
            "4 days ago",
            "3 days ago",
            "2 days ago",
            "yesterday",
          ],
          color: ["rgba(255,255,255, 1.9)"],
          datasets: [
            {
              label: "Coin value",
              data: coin_price,
              backgroundColor: ["rgba(255,255,255, 1.9)"],
              borderColor: ["rgba(255,255,255, 1.9)"],
            },
          ],
        });
      });
  }

  async function transaction(transactionData) {
    fetch("http://127.0.0.1:8000/api/v1/portfolio/create/transactions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },

      body: JSON.stringify(transactionData),
    }).then((data) => data.json());
  }

  const [crypto_coin, setCrypto] = useState("");
  const [transaction_type, setTransaction] = useState("");

  const handleTransaction = async (e) => {
    //e.preventDefault();
    await transaction({
      crypto_coin,
      transaction_type,
    });
  };

  async function getBalance() {
    fetch("http://127.0.0.1:8000/api/v1/portfolio/list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => setBalance(data));
  }

  async function getCoins() {
    fetch(`http://127.0.0.1:8000/api/v1/market/list`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => setCoins(data));
  }

  useEffect(() => {
    getCoins();
    getBalance();
  }, []);

  const handleCoin = (text) => {
    getPrices(text);
  };

  return (
    <div className="mainWrapper">
      <div className="cardWrapper">
        <hr></hr>
        {coins &&
          coins.map((coin) => {
            return (
              <div>
                <h5>Name: {coin.name}</h5>
                <h5>Current price: {coin.current_price}</h5>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    handleTransaction(setCrypto(coin.name), setTransaction("B"))
                  }
                >
                  Buy
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    handleTransaction(setCrypto(coin.name), setTransaction("S"))
                  }
                >
                  Sell
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleCoin(coin.name)}
                >
                  Show
                </Button>
                <hr />
              </div>
            );
          })}
      </div>

      <div className="chartDiv">
        <hr></hr>
        <Line data={chartData}></Line>
      </div>
    </div>
  );
}

export default withRouter(Market);

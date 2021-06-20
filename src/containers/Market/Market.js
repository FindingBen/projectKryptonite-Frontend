import React from "react";
import { withRouter } from "react-router-dom";
import "./Market.css";
import { useHistory, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { fetchCoins } from "../../actions/coinActions.js";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51IstcSItIESx0NnEGtXwAGh01JYT0J5RL8hcrTxyzJg4xSNifzyMFAKbURgHxbUUviKiuna6sB5YUxaDXY4HVNYr00z6zlrNr1"
);

function Market({ getCoins }) {
  var tokenAuth = sessionStorage.getItem("token");
  const [coins, setCoins] = useState();
  let coinsArray = [];
  const [chartData, setChartData] = useState();
  const [balance, setBalance] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState();
  const [amount, setAmount] = useState("");
  const [isFinished, setIsFinished] = useState(false);
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

  async function handleClick(amountAccount) {
    const stripe = await stripePromise;
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-ACCESS-TOKEN": tokenAuth,
        },
        body: JSON.stringify(amountAccount),
      }
    );
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleClick({
      amount,
    });
    setIsFinished(true);
  };

  async function transaction(transactionData) {
    fetch("http://127.0.0.1:8000/api/v1/portfolio/create/transactions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },

      body: JSON.stringify(transactionData),
    })
      .then((data) => data.json())
      .then((data) => setMessage(data));
  }

  async function handleTransaction(crypto_coin, transaction_type) {
    //e.preventDefault();
    await transaction({
      crypto_coin,
      transaction_type,
    });
  }

  function getBalance() {
    fetch("http://127.0.0.1:8000/api/v1/portfolio/list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
    })
      .then((data) => data.json())
      .then((data) => setBalance(data.balance));
  }

  async function getCoins() {
    setLoading(true);
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

    setLoading(false);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    getCoins();
    //dispatch(fetchCoins());
    getBalance();
  }, []);

  const handleCoin = (text) => {
    getPrices(text);
  };

  return (
    <div className="mainWrapper">
      <div className="msgDiv">
        {message ? (
          <div className="responseMsg">
            <div class="alert alert-success" role="alert">
              {message}
            </div>
          </div>
        ) : null}
      </div>
      <div className="cardWrapper">
        <hr></hr>
        {loading ? (
          <div>Loading..</div>
        ) : (
          <div>
            {coins &&
              coins.map((coin) => {
                return (
                  <div>
                    <p>Name: {coin.name}</p>
                    <p>Current price: {coin.current_price}</p>
                    <p>Price difference: + {coin.price_change}</p>
                    <Button
                      color="primary"
                      variant="contained"
                      className="buyBtn"
                      onClick={(e) => handleTransaction(coin.name, "B")}
                    >
                      Buy
                    </Button>
                    <Button
                      className="sellBtn"
                      color="primary"
                      variant="contained"
                      onClick={() => handleTransaction(coin.name, "S")}
                    >
                      Sell
                    </Button>
                    <Button
                      className="showBtn"
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
        )}
      </div>
      <div className="profileDiv">
        <form onSubmit={handleSubmit} className="bankForm">
          <h1 class="h3 mb-3 font-weight-normal">Deposit funds</h1>
          <h5>
            Current balance: <u>{balance}</u>
          </h5>
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              placeholder="Enter your ammount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <hr></hr>
          <button type="submit" class="btn btn-primary">
            Top up
          </button>
        </form>
      </div>
      <div className="chartDiv">
        <hr></hr>
        {chartData ? (
          <Line data={chartData}></Line>
        ) : (
          <div>
            <h2>Click 'Show' on one of the coins to see chart</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(Market);

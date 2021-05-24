import React from "react";
import { withRouter } from "react-router-dom";
import "./Market.css";
import { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import axios from "axios";
function Market({ getCoins }) {
  var tokenAuth = sessionStorage.getItem("token");
  const [coins, setCoins] = useState();
  const [chartData, setChartData] = useState();

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
    // getPrices();
    getCoins();
  }, []);
  console.log(coins);
  const handleCoin = (text) => {
    getPrices(text);
  };

  return (
    <div className="mainWrapper">
      <div className="cardWrapper">
        {coins &&
          coins.map((coin) => {
            return (
              <Card className="main-card">
                <CardContent>
                  <Typography
                    className="text-card"
                    color="textSecondary"
                    gutterBottom
                  >
                    <p>Name: {coin.name}</p>
                  </Typography>
                  <Typography
                    className="text-card"
                    color="textSecondary"
                    gutterBottom
                  >
                    <p>Symbol: {coin.symbol}</p>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => handleCoin(coin.name)} size="small">
                    Buy
                  </Button>
                  <Button onClick={() => handleCoin(coin.name)} size="small">
                    Show
                  </Button>
                </CardActions>
              </Card>
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

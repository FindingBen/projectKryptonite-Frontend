import { FETCH_COINS, NEW_POST } from "./types";

export const fetchCoins = () => (dispatch) => {
  console.log("Fetch me");
  var tokenAuth = sessionStorage.getItem("token");
  fetch("http://127.0.0.1:8000/api/v1/market/list", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-ACCESS-TOKEN": tokenAuth,
    },
  })
    .then((res) => res.json())
    .then((coins) =>
      dispatch({
        type: FETCH_COINS,
        payload: coins,
      })
    );
};

// import React, { Component } from "react";
// import { Line } from "react-chartjs-2";
// import { useEffect, useState } from "react";

// const Chart = () => {
//   var tokenAuth = sessionStorage.getItem("token");
//   const [coins, setCoins] = useState();
//   // /const [chart, setChart] = useState();
//   async function getPrices() {
//     fetch(`http://127.0.0.1:8000/api/v1/market/list`, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "X-ACCESS-TOKEN": tokenAuth,
//       },
//     })
//       .then((data) => data.json())
//       .then((data) => setCoins(data))
//       .then((data) => console.log(data));
//   }

//   // useEffect(() => {
//   //   getPrices();
//   // }, []);
//   console.log(coins);
//   const chart = {
//     chartData: {
//       labels: [
//         "5 days ago",
//         "4 days ago",
//         "3 days ago",
//         "2 days ago",
//         "yesterday",
//       ],
//       datasets: [
//         {
//           label: "Coin value",
//           data: [
//             coins[0].price,
//             coins[1].price,
//             coins[2].price,
//             coins[3].price,
//             coins[4].price,
//           ],
//           backgroundColor: ["rgba(255,255,255, 0.9)"],
//         },
//       ],
//     },
//   };
//   return (
//     <div className="chart">
//       <button onClick={getPrices}>Click me</button>
//       <Line data={chart.chartData}></Line>
//     </div>
//   );
// };

// export default Chart;

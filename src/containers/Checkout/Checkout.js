import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Checkout.css";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe("pk_test_51IstcSItIESx0NnEGtXwAGh01JYT0J5RL8hcrTxyzJg4xSNifzyMFAKbURgHxbUUviKiuna6sB5YUxaDXY4HVNYr00z6zlrNr1");
// const ProductDisplay = ({ handleClick }) => (
//   <section>
//     <button type="button" id="checkout-button" role="link" onClick={handleClick}>
//       Checkout
//     </button>
//   </section>
// );

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );
export default function Checkout() {
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  var tokenAuth = sessionStorage.getItem("token");

  
  /* return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  ); */
  async function handleClick(amountAccount){
    const stripe = await stripePromise;
    const response = await fetch("http://127.0.0.1:8000/api/v1/payments/create-checkout-session", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-ACCESS-TOKEN": tokenAuth,
      },
      body: JSON.stringify(amountAccount),
    });
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
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleClick({
      amount,
    });
}

  return(
    <form onSubmit={handleSubmit} class="form-signin">
    <hr />
    <input
      type="number"
      id="amount"
      placeholder="Amount"
      required
      autofocus
      onChange={(e) => setAmount(e.target.value)}/>
      <hr />
      <button id="checkout-button" type="submit" role="link">
      Checkout
    </button>
     </form>
     
     )  
  
}

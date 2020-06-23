"use strict";

var stripe = Stripe("pk_test_51GukP3KkoFC8y2MeQkPwjVZfHpygG7Lbkxq9JxxqEevg8CPH86JDzag5oM235ysfld8EnWnf3TgQD9UlZrKB069Y00GmGkJBJM"); // Create an instance of Elements.

var elements = stripe.elements(); // Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)

var style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
}; // Create an instance of the card Element.

var card = elements.create("card", {
  style: style
}); // Add an instance of the card Element into the `card-element` <div>.

card.mount("#card-element");
var form = document.getElementById("payment-form");
var clientSecret = document.querySelector("#card-button").dataset.secret;
var customerName = document.querySelector("#card-button").dataset.customer;
form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name: customerName
      }
    }
  }).then(function (result) {
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        fetch("/succeed", {
          method: "POST"
        }).then(function () {
          window.location.href = "/";
        });
      }
    }
  });
});
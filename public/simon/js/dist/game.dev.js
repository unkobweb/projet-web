"use strict";

var game = new Vue({
  el: "#game",
  data: {
    id: 0,
    quantity: 0
  },
  methods: {
    buy: function buy() {
      fetch("/buy/" + this.id, {
        method: "POST"
      }).then(function (data) {
        return data.json();
      }).then(function (res) {
        console.log(res);

        if (res.status == "success") {
          window.location.href = "/cart";
        }
      });
    }
  },
  created: function created() {
    var game = document.querySelector("#game");
    this.id = game.dataset.id;
    this.quantity = game.dataset.quantity;
  }
});
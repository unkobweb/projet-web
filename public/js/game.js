let game = new Vue({
  el: "#game",
  data: {
    id: 0,
    quantity: 0,
  },
  methods: {
    buy: function () {
      console.log("oui");
    },
  },
  created: function () {
    let game = document.querySelector("#game");
    this.id = game.dataset.id;
    this.quantity = game.dataset.quantity;
  },
});

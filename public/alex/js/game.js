let game = new Vue({
  el: "#game",
  data: {
    id: 0,
    quantity: 0,
  },
  methods: {
    buy: function () {
      fetch("/buy/" + this.id, { method: "POST" })
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          console.log(res);
          if (res.status == "success") {
            window.location.href = "/cart";
          }
        });
    },
  },
  created: function () {
    let game = document.querySelector("#game");
    this.id = game.dataset.id;
    this.quantity = game.dataset.quantity;
  },
});

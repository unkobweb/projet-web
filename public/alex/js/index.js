const numberOfGames = 6;

let index = new Vue({
  el: "#homepage",
  data: {
    offsetDiscount: 0,
    offsetLate: 0,
    jeuxDiscount: [],
    jeuxLate: [],
  },
  methods: {
    goToGame: function (id) {
      window.location.href = "/game/" + id;
    },
    getNewGames: function (direction, type) {
      console.log(direction);
      console.log(type);
      if (direction == "left") {
        if (type == "late" && this.offsetLate != 0) {
          this.offsetLate -= numberOfGames;
          fetch("/getLate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              offset: this.offsetLate,
              number: numberOfGames,
            }),
          })
            .then((res) => res.json())
            .then((data) => (this.jeuxLate = data));
        } else if (this.offsetDiscount != 0) {
          this.offsetDiscount -= numberOfGames;
          fetch("/getDiscount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              offset: this.offsetDiscount,
              number: numberOfGames,
            }),
          })
            .then((res) => res.json())
            .then((data) => (this.jeuxDiscount = data));
        }
      } else {
        if (type == "late") {
          this.offsetLate += numberOfGames;
          fetch("/getLate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              offset: this.offsetLate,
              number: numberOfGames,
            }),
          })
            .then((res) => res.json())
            .then((data) => (this.jeuxLate = data));
        } else {
          this.offsetDiscount += numberOfGames;
          fetch("/getDiscount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              offset: this.offsetDiscount,
              number: numberOfGames,
            }),
          })
            .then((res) => res.json())
            .then((data) => (this.jeuxDiscount = data));
        }
      }
    },
  },
  created: function () {
    fetch("/getDiscount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offset: this.offsetDiscount,
        number: numberOfGames,
      }),
    })
      .then((res) => res.json())
      .then((data) => (this.jeuxDiscount = data));
    fetch("/getLate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offset: this.offsetLate,
        number: numberOfGames,
      }),
    })
      .then((res) => res.json())
      .then((data) => (this.jeuxLate = data));
  },
});

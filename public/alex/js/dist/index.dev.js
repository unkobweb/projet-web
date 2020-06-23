"use strict";

var numberOfGames = 6;
var index = new Vue({
  el: "#homepage",
  data: {
    offsetDiscount: 0,
    offsetLate: 0,
    jeuxDiscount: [],
    jeuxLate: []
  },
  methods: {
    goToGame: function goToGame(id) {
      window.location.href = "/game/" + id;
    },
    getNewGames: function getNewGames(direction, type) {
      var _this = this;

      console.log(direction);
      console.log(type);

      if (direction == "left") {
        if (type == "late" && this.offsetLate != 0) {
          this.offsetLate -= numberOfGames;
          fetch("/getLate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              offset: this.offsetLate,
              number: numberOfGames
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            return _this.jeuxLate = data;
          });
        } else if (this.offsetDiscount != 0) {
          this.offsetDiscount -= numberOfGames;
          fetch("/getDiscount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              offset: this.offsetDiscount,
              number: numberOfGames
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            return _this.jeuxDiscount = data;
          });
        }
      } else {
        if (type == "late") {
          this.offsetLate += numberOfGames;
          fetch("/getLate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              offset: this.offsetLate,
              number: numberOfGames
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            return _this.jeuxLate = data;
          });
        } else {
          this.offsetDiscount += numberOfGames;
          fetch("/getDiscount", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              offset: this.offsetDiscount,
              number: numberOfGames
            })
          }).then(function (res) {
            return res.json();
          }).then(function (data) {
            return _this.jeuxDiscount = data;
          });
        }
      }
    }
  },
  created: function created() {
    var _this2 = this;

    fetch("/getDiscount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        offset: this.offsetDiscount,
        number: numberOfGames
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      return _this2.jeuxDiscount = data;
    });
    fetch("/getLate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        offset: this.offsetLate,
        number: numberOfGames
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      return _this2.jeuxLate = data;
    });
  }
});
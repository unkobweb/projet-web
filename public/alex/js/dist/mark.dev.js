"use strict";

var mark = new Vue({
  el: "#mark",
  data: {
    mark: 1,
    review: ""
  },
  methods: {
    changeMark: function changeMark(id) {
      this.mark = id;
    },
    overmark: function overmark(id) {
      var stars = document.querySelectorAll(".fa-star");

      for (var i = 0; i < id; i++) {
        var classes = stars[i].className.split(" ");
        classes.shift();
        classes.unshift("fas");
        stars[i].className = classes.join(" ");
      }

      for (var _i = 5; _i > id; _i--) {
        var _classes = stars[_i - 1].className.split(" ");

        _classes.shift();

        _classes.unshift("far");

        stars[_i - 1].className = _classes.join(" ");
      }
    },
    restoreMark: function restoreMark() {
      var stars = document.querySelectorAll(".fa-star");

      for (var i = 0; i < this.mark; i++) {
        var classes = stars[i].className.split(" ");
        classes.shift();
        classes.unshift("fas");
        stars[i].className = classes.join(" ");
      }

      for (var _i2 = 5; _i2 > this.mark; _i2--) {
        var _classes2 = stars[_i2 - 1].className.split(" ");

        _classes2.shift();

        _classes2.unshift("far");

        stars[_i2 - 1].className = _classes2.join(" ");
      }
    },
    buy: function buy() {
      fetch("/addMark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameId: parseInt(document.querySelector("#game").dataset.gameid),
          mark: this.mark,
          review: this.review
        })
      }).then(function () {
        window.location.href = "/purchases";
      });
    }
  }
});
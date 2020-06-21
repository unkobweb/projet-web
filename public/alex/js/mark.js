let mark = new Vue({
  el: "#mark",
  data: {
    mark: 1,
    review: "",
  },
  methods: {
    changeMark: function (id) {
      this.mark = id;
    },
    overmark: function (id) {
      let stars = document.querySelectorAll(".fa-star");
      for (let i = 0; i < id; i++) {
        let classes = stars[i].className.split(" ");
        classes.shift();
        classes.unshift("fas");
        stars[i].className = classes.join(" ");
      }
      for (let i = 5; i > id; i--) {
        let classes = stars[i - 1].className.split(" ");
        classes.shift();
        classes.unshift("far");
        stars[i - 1].className = classes.join(" ");
      }
    },
    restoreMark: function () {
      let stars = document.querySelectorAll(".fa-star");
      for (let i = 0; i < this.mark; i++) {
        let classes = stars[i].className.split(" ");
        classes.shift();
        classes.unshift("fas");
        stars[i].className = classes.join(" ");
      }
      for (let i = 5; i > this.mark; i--) {
        let classes = stars[i - 1].className.split(" ");
        classes.shift();
        classes.unshift("far");
        stars[i - 1].className = classes.join(" ");
      }
    },
    buy: function () {
      fetch("/addMark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: parseInt(document.querySelector("#game").dataset.gameid),
          mark: this.mark,
          review: this.review,
        }),
      }).then(() => {
        window.location.href = "/purchases";
      });
    },
  },
});

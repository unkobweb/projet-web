let index = new Vue({
  el: "#homepage",
  methods: {
    goToGame: function (id) {
      window.location.href = "/game/" + id;
    },
  },
});

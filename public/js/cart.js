let cart = new Vue({
  el: "#cart",
  methods: {
    removeProduct: function (id) {
      console.log(id);
      fetch("/removeFromCart/" + id, {
        method: "POST",
      }).then(() => {
        document.location.reload(true);
      });
    },
  },
});

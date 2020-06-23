"use strict";

var cart = new Vue({
  el: "#cart",
  methods: {
    removeProduct: function removeProduct(id) {
      console.log(id);
      fetch("/removeFromCart/" + id, {
        method: "POST"
      }).then(function () {
        document.location.reload(true);
      });
    }
  }
});
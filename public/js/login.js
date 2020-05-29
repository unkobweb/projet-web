let login = new Vue({
  el: "#login",
  data: {
    message: "",
    mail: "",
    password: "",
  },
  methods: {
    login: function () {
      this.message = "";
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: this.mail,
          password: this.password,
        }),
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res.err);
          if (res.err) {
            this.message = res.err;
          } else {
            window.location.href = "/";
          }
        });
    },
  },
});

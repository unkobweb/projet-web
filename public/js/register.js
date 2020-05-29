function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

let register = new Vue({
  el: "#register",
  data: {
    message: "",
    username: "",
    mail: "",
    password: "",
    confirmPassword: "",
    error: false,
  },
  methods: {
    register: function () {
      this.message = "";
      this.error = false;
      if (this.username.trim().length <= 0) {
        this.message += "Vous n'avez pas rentré de nom d'utilisateur\n";
        this.error = true;
      }
      if (!validateEmail(this.mail.trim())) {
        this.message += "Vous n'avez pas renseigné une adresse mail valide\n";
        this.error = true;
      }
      if (
        this.password.trim() !== this.confirmPassword.trim() ||
        this.password.trim().length <= 0
      ) {
        this.message +=
          "Vous n'avez pas renseigné deux mots de passes valides et identiques";
        this.error = true;
      }
      if (!this.error) {
        fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            mail: this.mail,
            password: this.password,
          }),
        })
          .then((data) => data.json())
          .then((res) => {
            if (res.err) {
              this.message = res.err;
            } else {
              window.location.href = "/login";
            }
          });
      }
    },
  },
});

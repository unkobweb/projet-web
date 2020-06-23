"use strict";

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateDate(date) {
  var re = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  return re.test(String(date).toLowerCase());
}

var register = new Vue({
  el: "#register",
  data: {
    firebaseConfig: {
      apiKey: "AIzaSyBNHbpw_xyCeYmm30OtArbZe7SFCteL34E",
      authDomain: "to-game-together.firebaseapp.com",
      databaseURL: "https://to-game-together.firebaseio.com",
      projectId: "to-game-together",
      storageBucket: "to-game-together.appspot.com",
      messagingSenderId: "452035355461",
      appId: "1:452035355461:web:80649ad19e39cee86d142c",
      measurementId: "G-LHT975FTVS"
    },
    googleProvider: null,
    facebookProvider: null,
    message: "",
    username: "",
    mail: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: new Date()
  },
  methods: {
    register: function register() {
      var _this = this;

      console.log(this.dateOfBirth);
      console.log(validateDate(this.dateOfBirth));
      this.message = "";

      if (this.username.trim().length <= 0) {
        this.message = "Vous n'avez pas rentré de nom d'utilisateur\n";
      } else if (!validateEmail(this.mail.trim())) {
        this.message = "Vous n'avez pas renseigné une adresse mail valide\n";
      } else if (this.password.trim() !== this.confirmPassword.trim() || this.password.trim().length <= 0) {
        this.message = "Vous n'avez pas renseigné deux mots de passes valides et identiques";
      } else if (!validateDate(this.dateOfBirth)) {
        this.message = "Vous n'avez pas entré votre date de naissance";
      } else {
        fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: this.username,
            mail: this.mail,
            password: this.password,
            date: this.dateOfBirth
          })
        }).then(function (data) {
          return data.json();
        }).then(function (res) {
          if (res.err) {
            _this.message = res.err;
          } else {
            window.location.href = "/login";
          }
        });
      }
    },
    externalLogin: function externalLogin(provider) {
      firebase.auth().signInWithPopup(eval(provider)).then(function (result) {
        console.log(result.user);
        fetch("/externalConnexion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: result.user.uid,
            name: result.user.displayName,
            mail: result.user.email
          })
        }).then(function () {
          window.location.href = "/";
        });
      })["catch"](function (error) {
        console.log(error.code);
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential; // ...
      });
    }
  },
  created: function created() {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
  }
});
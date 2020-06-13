let login = new Vue({
  el: "#login",
  data: {
    firebaseConfig: {
      apiKey: "AIzaSyBNHbpw_xyCeYmm30OtArbZe7SFCteL34E",
      authDomain: "to-game-together.firebaseapp.com",
      databaseURL: "https://to-game-together.firebaseio.com",
      projectId: "to-game-together",
      storageBucket: "to-game-together.appspot.com",
      messagingSenderId: "452035355461",
      appId: "1:452035355461:web:80649ad19e39cee86d142c",
      measurementId: "G-LHT975FTVS",
    },
    googleProvider: null,
    facebookProvider: null,
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
    externalLogin: function (provider) {
      firebase
        .auth()
        .signInWithPopup(eval(provider))
        .then(function (result) {
          console.log(result.user);
          fetch("/externalConnexion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: result.user.uid,
              name: result.user.displayName,
              mail: result.user.email,
            }),
          }).then(() => {
            window.location.href = "/";
          });
        })
        .catch(function (error) {
          console.log(error.code);
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          // ...
        });
    },
  },
  created: function () {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();

    this.googleProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
  },
});

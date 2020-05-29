const firebase = require("firebase");

const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  storageBucket: process.env.STORAGE_BUCKET,
};

firebase.initializeApp(config);
const auth = firebase.auth();

module.exports = auth;
global.auth = auth;

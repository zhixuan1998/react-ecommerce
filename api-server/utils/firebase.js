const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const config = require("../appsettings");

const app = initializeApp(config.firebaseconfig);
const auth = getAuth(app);

module.exports = { auth };

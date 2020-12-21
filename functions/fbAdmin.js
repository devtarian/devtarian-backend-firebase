const config = require("./config");
const serviceAccount = require("./admin.json");
const firebase = require("firebase");

const admin = require("firebase-admin");

firebase.initializeApp(config);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://project-devtarian-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();

module.exports = { firebase, admin, db };

const functions = require("firebase-functions");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = swaggerJSDoc(require("./swagger"));

app.use("/swagger-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(require("./routes"));

exports.api = functions.region("asia-northeast3").https.onRequest(app);

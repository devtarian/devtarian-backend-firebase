const functions = require("firebase-functions");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const { db } = require("./fbAdmin");

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

exports.onStoreDelete = functions
    .region("asia-northeast3")
    .firestore.document("/store/{storeId}")
    .onDelete(async (snapshot, context) => {
        try {
            const storeId = context.params.storeId;
            const batch = db.batch();

            const reviewDoc = await db
                .collection("review")
                .where("storeId", "==", storeId)
                .get();

            reviewDoc.docs.forEach((doc) => {
                batch.delete(db.doc(`/review/${doc.id}`));
            });

            const likeDoc = await db
                .collection("like")
                .where("storeId", "==", storeId)
                .get();

            likeDoc.docs.forEach((doc) => {
                batch.delete(db.doc(`/like/${doc.id}`));
            });

            const favoriteDoc = await db
                .collection("favorite")
                .where("storeId", "==", storeId)
                .get();

            favoriteDoc.docs.forEach((doc) => {
                batch.delete(db.doc(`/favorite/${doc.id}`));
            });

            const commentDoc = await db
                .collection("comment")
                .where("storeId", "==", storeId)
                .get();

            commentDoc.docs.forEach((doc) => {
                batch.delete(db.doc(`/comment/${doc.id}`));
            });

            batch.commit();
        } catch (err) {
            console.log(err);
        }
    });

exports.onWikiDelete = functions
    .region("asia-northeast3")
    .firestore.document("/wiki/{wikiId}")
    .onDelete(async (snapshot, context) => {
        try {
            const wikiId = context.params.wikiId;
            const batch = db.batch();

            const favoriteDoc = await db
                .collection("favorite")
                .where("wikiId", "==", wikiId)
                .get();

            favoriteDoc.docs.forEach((doc) => {
                batch.delete(db.doc(`/favorite/${doc.id}`));
            });

            const commentDoc = await db
                .collection("comment")
                .where("wikiId", "==", wikiId)
                .get();

            commentDoc.docs.forEach((doc) => {
                batch.delete(db.doc(`/comment/${doc.id}`));
            });

            batch.commit();
        } catch (err) {
            console.log(err);
        }
    });


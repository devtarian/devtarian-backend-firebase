const { firebase, admin, db } = require("../../fbAdmin");
const config = require("../../config");
const { GeoFirestore } = require("geofirestore");

exports.createStore = async (req, res) => {
    try {
        let { lat, lng, ...newStore } = req.body;

        const geoFirestore = new GeoFirestore(db);
        const collection = geoFirestore.collection("store");

        newStore.coordinates = new admin.firestore.GeoPoint(lat, lng);
        newStore.createAt = new Date().toISOString();
        newStore.likeCount = 0;
        newStore.commentCount = 0;

        await collection.add(newStore);
        return res.status(200).json(newStore);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.getStore = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const docStore = await db.doc(`/store/${storeId}`).get();
        if (!docStore.exists) {
            return res
                .status(404)
                .json({ error: "일치하는 Stores가 없습니다." });
        }

        const store = docStore.data();
        const docReviews = await db
            .collection("review")
            // .orderBy("createdAt", "desc")
            .where("storeId", "==", storeId)
            .get();

        store.storeId = docStore.id;
        store.reviews = await docReviews.docs.map((doc) => doc.data());

        return res.status(200).json(store);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

exports.createReview = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const newReview = { ...req.body, storeId };

        const store = await db.doc(`/store/${storeId}`).get();

        if (!store.exists) {
            return res.status(404).json({ error: "Store not found" });
        }

        await store.ref.update({ reviewCount: store.data().reviewCount + 1 });
        await db.collection("review").add(newReview);

        return res.status(200).json(newReview);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

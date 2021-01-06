const { firebase, admin, db } = require("../../fbAdmin");
const config = require("../../config");
const { GeoFirestore } = require("geofirestore");

exports.createStore = async (req, res) => {
    try {
        const newStore = {};
        const { lat, lng, ...store } = req.body;

        newStore.writer = req.user.username;
        newStore.coordinates = new admin.firestore.GeoPoint(lat, lng);
        newStore.store = store;
        newStore.createdAt = new Date().toISOString();
        newStore.reviewCount = 0;
        newStore.favorite = false;

        const geoFirestore = new GeoFirestore(db);
        const collection = geoFirestore.collection("store");

        await collection.add(newStore);
        console.log("?");
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
            .where("storeId", "==", storeId)
            .orderBy("createdAt", "desc")
            .get();

        store.storeId = docStore.id;
        store.reviews = await docReviews.docs.map((doc) => {
            let { storeId, ...review } = doc.data();
            return {
                id: doc.id,
                ...review,
            };
        });

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
        const newReview = req.body;

        const store = await db.doc(`/store/${storeId}`).get();

        if (!store.exists) {
            return res.status(404).json({ error: "Store not found" });
        }

        const reviewCount = store.data().reviewCount + 1;
        await store.ref.update({ reviewCount });

        newReview.storeId = storeId;
        newReview.writer = req.user.username;
        newReview.reviewCount = reviewCount;
        newReview.createdAt = new Date().toISOString();
        newReview.likes = 0;
        newReview.likesOfMe = false;

        await db.collection("review").add(newReview);
        console.log("??");
        return res.status(200).json(newReview);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

exports.getComment = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const docComment = await db
            .collection("comment")
            .where("reviewId", "==", reviewId)
            .orderBy("createdAt", "asc")
            .get();

        const comments = await docComment.docs.map((doc) => {
            let { reviewId, ...comment } = doc.data();
            return {
                id: doc.id,
                ...comment,
            };
        });

        return res.status(200).json(comments);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.createComment = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const newComment = req.body;

        const review = await db.doc(`/review/${reviewId}`).get();
        if (!review.exists) {
            return res.status(404).json({ error: "review not found" });
        }

        newComment.writer = req.user.username;
        newComment.reviewId = req.params.reviewId;
        newComment.createdAt = new Date().toISOString();

        await db.collection("comment").add(newComment);

        return res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

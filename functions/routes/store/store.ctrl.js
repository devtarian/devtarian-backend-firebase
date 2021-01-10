const { firebase, admin, db } = require("../../fbAdmin");
const config = require("../../config");
const { GeoFirestore } = require("geofirestore");
const checkUserId = require("../../utils/checkUserId");

exports.createStore = async (req, res) => {
    try {
        const newStore = {};
        const { lat, lng, ...info } = req.body;

        newStore.writer = req.user.username;
        newStore.coordinates = new admin.firestore.GeoPoint(lat, lng);
        newStore.info = info;
        newStore.createdAt = new Date().toISOString();
        newStore.reviews = 0;
        newStore.favorite = false;

        const geoFirestore = new GeoFirestore(db);
        const collection = geoFirestore.collection("store");

        await collection.add(newStore);
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.getStoreDetail = async (req, res) => {
    try {
        const userId = await checkUserId(req);
        const storeId = req.params.storeId;
        const docStore = await db.doc(`/store/${storeId}`).get();
        if (!docStore.exists) {
            return res
                .status(404)
                .json({ error: "일치하는 Stores가 없습니다." });
        }

        const { g, ...store } = docStore.data();
        store.id = docStore.id;

        let favorite = false;
        if (userId) {
            const docFavorite = await db
                .collection("favorite")
                .where("storeId", "==", storeId)
                .where("userId", "==", userId)
                .limit(1)
                .get();
            favorite = docFavorite.empty ? false : true;
        }

        store.favorite = favorite;
        const docReviews = await db
            .collection("review")
            .where("storeId", "==", storeId)
            .orderBy("createdAt", "desc")
            .get();

        store.reviewList = await docReviews.docs.map((doc) => {
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

exports.favoriteStore = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const userId = req.user.userId;

        const docFavorite = await db
            .collection("favorite")
            .where("storeId", "==", storeId)
            .where("userId", "==", userId)
            .limit(1)
            .get();

        if (docFavorite.docs.length > 0) {
            return res.status(400).json({ error: "Store already favorited" });
        }

        await db.collection("favorite").add({ storeId, userId });
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.unfavoriteStore = async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const userId = req.user.userId;

        const docFavorite = await db
            .collection("favorite")
            .where("storeId", "==", storeId)
            .where("userId", "==", userId)
            .limit(1)
            .get();

        if (docFavorite.docs.length === 0) {
            return res.status(400).json({ error: "Store already unfavorited" });
        }

        const favoriteId = docFavorite.docs[0].id;
        await db.doc(`/favorite/${favoriteId}`).delete();

        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
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

        newReview.storeId = storeId;
        newReview.writer = req.user.username;
        newReview.createdAt = new Date().toISOString();
        newReview.likes = 0;
        newReview.comments = 0;
        newReview.likesOfMe = false;

        await db.collection("review").add(newReview);

        return res.status(200).json({});
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

// [TODO]
// delete Review
// reviews -1
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

        const comments = review.data().comments + 1;
        await review.ref.update({ comments });

        newComment.writer = req.user.username;
        newComment.reviewId = req.params.reviewId;
        newComment.createdAt = new Date().toISOString();

        const docComment = await db.collection("comment").add(newComment);
        newComment.id = docComment.id;

        return res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.likeReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user.userId;

        const review = await db.doc(`/review/${reviewId}`).get();
        if (!review.exists)
            return res.status(404).json({ error: "review not found" });

        const likes = review.data().likes + 1;
        await review.ref.update({ likes });

        const docLike = await db
            .collection("like")
            .where("reviewId", "==", reviewId)
            .where("userId", "==", userId)
            .limit(1)
            .get();

        if (docLike.docs.length > 0) {
            return res.status(400).json({ error: "Review already liked" });
        }

        await db.collection("like").add({ reviewId, userId });

        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.unlikeReview = async (req, res) => {
    try {
        const userId = req.user.userId;
        const reviewId = req.params.reviewId;

        const review = await db.doc(`/review/${reviewId}`).get();
        if (!review.exists)
            return res.status(404).json({ error: "review not found" });

        const likes = review.data().likes - 1;
        await review.ref.update({ likes });

        const docLike = await db
            .collection("like")
            .where("reviewId", "==", reviewId)
            .where("userId", "==", userId)
            .limit(1)
            .get();

        if (docLike.empty) {
            // empty
            return res.status(400).json({ error: "Review already unLiked" });
        }

        const likeId = docLike.docs[0].id;
        await db.doc(`/like/${likeId}`).delete();

        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

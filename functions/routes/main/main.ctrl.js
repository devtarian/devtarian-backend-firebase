const { firebase, db } = require("../../fbAdmin");
const { GeoFirestore } = require("geofirestore");
const checkFavorite = require("../../utils/checkFavorite");
const checkLikesOfMe = require("../../utils/checkLikesOfMe");

exports.getMain = async (req, res) => {
    try {
        const lat = Number(req.query.lat || 37.573);
        const lng = Number(req.query.lng || 126.9794);
        const geocollection = new GeoFirestore(db).collection("store");
        const storeSnap = await geocollection
            .near({
                radius: 5, // km
                center: new firebase.firestore.GeoPoint(lat, lng),
            })
            .limit(4)
            .get();

        const store = await Promise.all(
            storeSnap.docs.map(async (doc) => {
                let { g, ...rest } = doc.data();
                return {
                    ...rest,
                    id: doc.id,
                    favorite: await checkFavorite(req, "storeId", doc.id),
                };
            })
        );

        const ratedDoc = await db
            .collection("store")
            .orderBy("info.starRating", "desc")
            .limit(4)
            .get();

        const rated = await Promise.all(
            ratedDoc.docs.map(async (doc) => {
                let { g, ...rest } = doc.data();
                return {
                    ...rest,
                    id: doc.id,
                    favorite: await checkFavorite(req, "storeId", doc.id),
                };
            })
        );

        const wikiDoc = await db
            .collection("wiki")
            .orderBy("createdAt", "desc")
            .limit(4)
            .get();

        const wiki = await Promise.all(
            wikiDoc.docs.map(async (doc) => {
                const { imgUrls, ...rest } = doc.data();
                return {
                    ...rest,
                    id: doc.id,
                    imgUrl: imgUrls[0] ? imgUrls[0] : "",
                    favorite: await checkFavorite(req, "wikiId", doc.id),
                };
            })
        );

        const reviewDoc = await db
            .collection("review")
            .orderBy("createdAt", "desc")
            .limit(4)
            .get();

        const review = await Promise.all(
            reviewDoc.docs.map(async (doc) => {
                const { imgUrls, ...rest } = doc.data();
                return {
                    ...rest,
                    id: doc.id,
                    imgUrl: imgUrls[0] ? imgUrls[0] : "",
                    likesOfMe: await checkLikesOfMe(req, "reviewId", doc.id),
                };
            })
        );

        return res.status(200).json({ store, rated, wiki, review });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

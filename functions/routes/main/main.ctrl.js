const { firebase, db } = require("../../fbAdmin");
const { GeoFirestore } = require("geofirestore");
const checkFavorite = require("../../utils/checkFavorite");

exports.getMain = async (req, res) => {
    try {
        const lat = Number(req.query.lat);
        const lng = Number(req.query.lng);
        const geocollection = new GeoFirestore(db).collection("store");
        const storeSnap = await geocollection
            .near({
                radius: 10, // km
                center: new firebase.firestore.GeoPoint(lat, lng),
            })
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

        const WikiDoc = await db
            .collection("wiki")
            .orderBy("createdAt", "desc")
            .limit(5)
            .get();

        const wiki = await Promise.all(
            WikiDoc.docs.map(async (doc) => {
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
            .limit(5)
            .get();

        const review = await Promise.all(
            reviewDoc.docs.map(async (doc) => {
                const { imgUrls, ...rest } = doc.data();
                return {
                    ...rest,
                    id: doc.id,
                    imgUrl: imgUrls[0] ? imgUrls[0] : "",
                    favorite: await checkFavorite(req, "reviewId", doc.id),
                };
            })
        );

        return res.status(200).json({ store, wiki, review });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

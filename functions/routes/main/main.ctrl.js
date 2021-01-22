const { firebase, db } = require("../../fbAdmin");
const { GeoFirestore } = require("geofirestore");
const checkFavorite = require("../../utils/checkFavorite");
const checkLikesOfMe = require("../../utils/checkLikesOfMe");
const computeDistance = require("../../utils/computeDistance");

exports.getMain = async (req, res) => {
    try {
        const lat = Number(req.query.lat || 37.573);
        const lng = Number(req.query.lng || 126.9794);
        const page = 1;
        const size = 4;

        const store = await queryStoreFunc(req, lat, lng, page, size);
        const rated = await queryRatedFunc(req, page, size);
        const wiki = await queryWikiFunc(req, page, size);
        const review = await queryReviewFunc(req, page, size);

        return res.status(200).json({ store, rated, wiki, review });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

exports.getMainMore = async (req, res) => {
    try {
        const type = req.query.type;
        const lat = req.query.lat || 37.573;
        const lng = req.query.lng || 126.9794;
        const page = req.query.page || 1;
        const size = req.query.limit || 4;

        let result = [];
        if (type === "store") {
            result = await queryStoreFunc(req, lat, lng, page, size);
        } else if (type === "reated") {
            result = await queryRatedFunc(req, page, size);
        } else if (type === "wiki") {
            result = await queryWikiFunc(req, page, size);
        } else if (type === "review") {
            result = await queryReviewFunc(req, page, size);
        }

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

const queryStoreFunc = async (req, lat, lng, page, size) => {
    const geocollection = new GeoFirestore(db).collection("store");
    const storeSnap = await geocollection
        .near({
            radius: 1000, // km
            center: new firebase.firestore.GeoPoint(Number(lat), Number(lng)),
        })
        .get();

    let store = await Promise.all(
        storeSnap.docs.map(async (doc) => {
            let { g, ...rest } = doc.data();
            return {
                ...rest,
                id: doc.id,
                distance: computeDistance(
                    { latitude: lat, longitude: lng },
                    g.geopoint
                ),
                favorite: await checkFavorite(req, "storeId", doc.id),
                imgUrl: rest.info.imgUrls[0] ? rest.info.imgUrls[0] : "",
            };
        })
    );

    store.sort((a, b) => Number(a.distance) - Number(b.distance));
    store = store.splice((page - 1) * size, size);
    return store;
};

const queryRatedFunc = async (req, page, size) => {
    const ratedDoc = await db
        .collection("store")
        .orderBy("info.starRating", "desc")
        .offset((page - 1) * size, size)
        .limit(size)
        .get();

    const rated = await Promise.all(
        ratedDoc.docs.map(async (doc) => {
            let { g, ...rest } = doc.data();
            return {
                ...rest,
                id: doc.id,
                favorite: await checkFavorite(req, "storeId", doc.id),
                imgUrl: rest.info.imgUrls[0] ? rest.info.imgUrls[0] : "",
            };
        })
    );

    return rated;
};

const queryWikiFunc = async (req, page, size) => {
    const wikiDoc = await db
        .collection("wiki")
        .orderBy("createdAt", "desc")
        .offset((page - 1) * size, size)
        .limit(size)
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

    return wiki;
};

const queryReviewFunc = async (req, page, size) => {
    const reviewDoc = await db
        .collection("review")
        .orderBy("createdAt", "desc")
        .offset((page - 1) * size, size)
        .limit(size)
        .get();

    const review = await Promise.all(
        reviewDoc.docs.map(async (doc) => {
            const { imgUrls, storeId, ...rest } = doc.data();

            const storeDoc = await db.doc(`/store/${storeId}`).get();

            return {
                ...rest,
                id: doc.id,
                imgUrl: imgUrls[0] ? imgUrls[0] : "",
                likesOfMe: await checkLikesOfMe(req, "reviewId", doc.id),
                storeId,
                info: storeDoc.data().info,
            };
        })
    );

    return review;
};

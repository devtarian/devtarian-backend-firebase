const { firebase, db } = require("../../fbAdmin");
const { GeoFirestore } = require("geofirestore");

exports.getMain = async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const geofirestore = new GeoFirestore(db);
        const geocollection = geofirestore.collection("store");
        const snapshot = await geocollection
            .near({
                center: new firebase.firestore.GeoPoint(
                    Number(lat),
                    Number(lng)
                ),
                radius: 10, // km
            })
            .get();

        const store = snapshot.docs.map((doc) => doc.data());
        const wiki = [];

        const docReview = await db
            .collection("review")
            .orderBy("createdAt", "desc")
            .limit(5)
            .get();

        const review = await docReview.docs.map((doc) => doc.data());

        return res.status(200).json({ store, wiki, review });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

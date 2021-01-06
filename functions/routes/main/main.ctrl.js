const { firebase, db } = require("../../fbAdmin");
const { GeoFirestore } = require("geofirestore");

exports.getMain = async (req, res) => {
    try {
        const { lat, lng } = req.query;
        const geofirestore = new GeoFirestore(db);
        const geocollection = geofirestore.collection("posts");
        const snapshot = await geocollection
            .near({
                center: new firebase.firestore.GeoPoint(
                    Number(lat),
                    Number(lng)
                ),
                radius: 10, // km
            })
            .get();

        const posts = snapshot.docs.map((doc) => doc.data());

        return res.status(200).json({ posts });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

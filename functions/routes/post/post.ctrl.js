const { firebase, admin, db } = require("../../fbAdmin");
const config = require("../../config");
const { GeoFirestore } = require("geofirestore");

exports.createPost = async (req, res) => {
    try {
        let { lat, lng, ...newPost } = req.body;

        const geoFirestore = new GeoFirestore(db);
        const collection = geoFirestore.collection("posts");

        newPost.coordinates = new admin.firestore.GeoPoint(lat, lng);
        newPost.createAt = new Date().toISOString();

        await collection.add(newPost);
        return res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.getPosts = async (req, res) => {
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

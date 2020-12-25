const { firebase, admin, db } = require("../../fbAdmin");
const config = require("../../config");

exports.createPost = async (req, res) => {
    try {
        let { lat, lng, ...newPost } = req.body;
        newPost.location = new admin.firestore.GeoPoint(lat, lng);
        newPost.createAt = new Date().toISOString();

        await db.collection("posts").add(newPost);
        return res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

// firestore geopoint javascript
// firestore geopoint query "node"
// firebase get data by lat lng
// https://stackoverflow.com/questions/47092198/how-to-save-geopoint-in-firestore-using-query
// https://levelup.gitconnected.com/nearby-location-queries-with-cloud-firestore-e7f4a2f18f9d
// https://jsbin.com/firoteluju/2/edit?js,console
// https://jsbin.com/zogeyar/edit?js,console

exports.fetchPost = async (req, res) => {
    try {
        console.log("------");
        console.log(req.body);
        console.log("------");
        return res.ststus(200).json({ message: "success" });
    } catch (err) {
        return res.status(500).json({
            error: "500 서버에러",
        });
    }
};

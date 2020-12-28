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

exports.getPostDetail = async (req, res) => {
    try {
        const postId = req.params.postId;
        const docPost = await db.doc(`/posts/${postId}`).get();
        if (!docPost.exists) {
            return res
                .status(404)
                .json({ error: "일치하는 Posts가 없습니다." });
        }

        const post = docPost.data();
        const docComments = await db
            .collection("comments")
            // .orderBy("createdAt", "desc")
            .where("postId", "==", postId)
            .get();

        // docComments.forEach((doc) => {
        //     post.comments.push(doc.data());
        //     console.log(doc.data());
        // });
        post.postId = docPost.id;
        post.comments = await docComments.docs.map((doc) => doc.data());

        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

const { admin, db } = require("../fbAdmin");

module.exports = checkLikesOfMe = async (req, key, value) => {
    try {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith("Bearer ")) return false;
        const token = auth.split("Bearer ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        const userDoc = await db
            .collection("users")
            .where("userId", "==", decodedToken.uid)
            .limit(1)
            .get();

        const userId = userDoc.docs[0].data().userId;

        const likeDoc = await db
            .collection("like")
            .where(key, "==", value)
            .where("userId", "==", userId)
            .limit(1)
            .get();
        return likeDoc.docs.length === 0 ? false : true;
    } catch (err) {
        return false;
    }
};

const { admin, db } = require("../fbAdmin");

module.exports = checkFavorite = async (req, key, value) => {
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

        const favoriteDoc = await db
            .collection("favorite")
            .where(key, "==", value)
            .where("userId", "==", userId)
            .limit(1)
            .get();

        return favoriteDoc.docs.length === 0 ? false : true;
    } catch (err) {
        console.error(err);
        return res.status(403).json(err);
    }
};

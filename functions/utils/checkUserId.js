const { admin, db } = require("../fbAdmin");

module.exports = checkUserId = (req) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split("Bearer ")[1];
    } else {
        return null;
    }

    return admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            return db
                .collection("users")
                .where("userId", "==", decodedToken.uid)
                .limit(1)
                .get();
        })
        .then((data) => {
            return data.docs[0].data().userId;
        })
        .catch((err) => {
            console.error("Error while verifing Token", err);
            return res.status(403).json(err);
        });
};

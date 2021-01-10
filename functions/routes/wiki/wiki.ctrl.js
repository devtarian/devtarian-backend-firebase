const { firebase, db } = require("../../fbAdmin");
const checkUserId = require("../../utils/checkUserId");

exports.getWiki = async (req, res) => {
    const orderMap = {
        createdAt: { key: "createdAt", order: "desc" },
        productDesc: { key: "product", order: "desc" },
        productAsc: { key: "product", order: "asc" },
    };
    try {
        const userId = await checkUserId(req);

        const category = req.query.category || "all";
        const page = req.query.category || 1;
        const limit = req.query.category || 20;
        const order = req.query.category || "createdAt";
        let wiki;
        if (category === "all") {
            wiki = await db
                .collection("wiki")
                .orderBy(orderMap[order].key, orderMap[order].order)
                .offset((page - 1) * limit)
                .limit(limit)
                .get();
        } else {
            wiki = await db
                .collection("wiki")
                .where("category", "==", category)
                .orderBy(orderMap[order].key, orderMap[order].order)
                .offset((page - 1) * limit)
                .limit(limit)
                .get();
        }

        wiki = await Promise.all(
            wiki.docs.map(async (doc) => {
                const { commentList, comments, ...rest } = doc.data();

                let favorite = false;
                if (userId) {
                    const docFavorite = await db
                        .collection("favorite")
                        .where("wikiId", "==", doc.id)
                        .where("userId", "==", userId)
                        .limit(1)
                        .get();
                    favorite = docFavorite.docs.length > 0 ? true : false;
                }
                return {
                    id: doc.id,
                    favorite,
                    ...rest,
                };
            })
        );
        console.log(wiki);
        return res.status(200).json(wiki);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.createWiki = async (req, res) => {
    try {
        const wiki = req.body;
        wiki.comments = 0;
        wiki.commentList = [];
        wiki.createdAt = new Date().toISOString();

        const docWiki = await db.collection("wiki").add(wiki);
        wiki.id = docWiki.id;
        return res.status(200).json(wiki);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.getWikiDetail = async (req, res) => {
    const wikiId = req.params.wikiId;

    try {
        const docWiki = await db.doc(`/wiki/${wikiId}`).get();
        if (!docWiki.exists) {
            return res.status(404).json({ error: "Wiki not found" });
        }

        const docCommentList = await db
            .collection("comment")
            .where("wikiId", "==", wikiId)
            .orderBy("createdAt", "asc")
            .get();

        const wiki = docWiki.data();
        wiki.id = docWiki.id;
        wiki.commentList = await docCommentList.docs.map((doc) => {
            const { wikiId, ...comment } = doc.data();
            return {
                id: doc.id,
                ...comment,
            };
        });

        return res.status(200).json(wiki);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.favoriteWiki = async (req, res) => {
    try {
        const wikiId = req.params.wikiId;
        const userId = req.user.userId;

        const docFavorite = await db
            .collection("favorite")
            .where("wikiId", "==", wikiId)
            .where("userId", "==", userId)
            .limit(1)
            .get();

        if (docFavorite.docs.length > 0) {
            return res.status(400).json({ error: "Wiki already favorited" });
        }

        await db.collection("favorite").add({ wikiId, userId });
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};
exports.unfavoriteWiki = async (req, res) => {
    try {
        const wikiId = req.params.wikiId;
        const userId = req.user.userId;

        const docFavorite = await db
            .collection("favorite")
            .where("wikiId", "==", wikiId)
            .where("userId", "==", userId)
            .limit(1)
            .get();

        if (docFavorite.docs.length === 0) {
            return res.status(400).json({ error: "Store already unfavorited" });
        }

        const favoriteId = docFavorite.docs[0].id;
        await db.doc(`/favorite/${favoriteId}`).delete();

        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.createWikiComment = async (req, res) => {
    try {
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.likeWikiComment = async (req, res) => {
    try {
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.unLikeWikiComment = async (req, res) => {
    try {
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

const { firebase, db } = require("../../fbAdmin");
const checkFavorite = require("../../utils/checkFavorite");

exports.getWiki = async (req, res) => {
    const orderMap = {
        createdAt: { key: "createdAt", order: "desc" },
        productDesc: { key: "product", order: "desc" },
        productAsc: { key: "product", order: "asc" },
    };
    try {
        const category = req.query.category || "all";
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const order = req.query.order || "createdAt";
        let wikiDoc;
        if (category === "all") {
            wikiDoc = await db
                .collection("wiki")
                .orderBy(orderMap[order].key, orderMap[order].order)
                .offset((page - 1) * limit)
                .limit(limit)
                .get();
        } else {
            wikiDoc = await db
                .collection("wiki")
                .where("category", "==", category)
                .orderBy(orderMap[order].key, orderMap[order].order)
                .offset((page - 1) * limit)
                .limit(limit)
                .get();
        }

        const wiki = await Promise.all(
            wikiDoc.docs.map(async (doc) => {
                const { commentList, comments, imgUrls, ...rest } = doc.data();

                return {
                    ...rest,
                    id: doc.id,
                    favorite: await checkFavorite(req, "wikiId", doc.id),
                    imgUrl: imgUrls[0] ? imgUrls[0] : "",
                };
            })
        );
        return res.status(200).json(wiki);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.createWiki = async (req, res) => {
    try {
        const wiki = req.body;
        const { createdAt, email, ...user } = req.user;
        wiki.writer = user;
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

exports.deleteWiki = async (req, res) => {
    try {
        const userId = req.user.userId;
        const wikiId = req.params.wikiId;
        const wikiDoc = await db.doc(`/wiki/${wikiId}`).get();

        if (!wikiDoc.exists) {
            return res.status(404).json({ error: "store not found" });
        }

        if (wikiDoc.data().writer.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await db.doc(`/wiki/${wikiId}`).delete();

        return res.status(200).json({});
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
        wiki.favorite = await checkFavorite(req, "wikiId", docWiki.id);
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
        const wikiId = req.params.wikiId;
        const newComment = req.body;

        const wiki = await db.doc(`wiki/${wikiId}`).get();
        if (!wiki.exists) {
            return escape.status(404).json({ error: "wiki not found" });
        }

        const comments = wiki.data().comments + 1;
        await wiki.ref.update({ comments });

        const { createdAt, email, ...user } = req.user;
        newComment.writer = user;
        newComment.wikiId = wikiId;
        newComment.createdAt = new Date().toISOString();

        const commentDoc = await db.collection("comment").add(newComment);
        newComment.id = commentDoc.id;

        return res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.deleteWikiComment = async (req, res) => {
    try {
        const userId = req.user.userId;
        const wikiId = req.params.wikiId;
        const commentId = req.params.commentId;
        const commentDoc = await db.doc(`/comment/${commentId}`).get();

        if (!commentDoc.exists) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (commentDoc.data().writer.userId !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        const wiki = await db.doc(`wiki/${wikiId}`).get();
        if (!wiki.exists) {
            return res.status(404).json({ error: "wiki not found" });
        }

        await db.doc(`/comment/${commentId}`).delete();

        const comments = wiki.data().comments - 1;
        await wiki.ref.update({ comments });

        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

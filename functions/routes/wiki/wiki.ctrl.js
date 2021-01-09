const { firebase, db } = require("../../fbAdmin");

exports.getWiki = async (req, res) => {
    try {
        return res.status(200).json({});
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

        const docWiki = await db.collection("wiki").add(wiki);
        wiki.id = docWiki.id;
        return res.status(200).json(wiki);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.getWikiDetail = async (req, res) => {
    try {
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};

exports.favoriteWiki = async (req, res) => {
    try {
        return res.status(200).json({});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
};
exports.unfavoriteWiki = async (req, res) => {
    try {
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

const { firebase, db, admin } = require("../../fbAdmin");
const config = require("../../config");

const { validateData } = require("../../utils/validate");

exports.signIn = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            pw: req.body.pw,
        };

        const { isValid, errors } = validateData(user);
        if (!isValid) return res.status(400).json(errors);

        const resUser = await firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.pw);
        const token = await resUser.user.getIdToken();
        console.log(firebase.auth().currentUser.refreshToken);

        return res.status(200).json({ token });
    } catch (err) {
        // console.error(err);
        if (err.code === "auth/user-not-found") {
            return res
                .status(400)
                .json({ email: "일치하는 email이 없습니다." });
        } else if (err.code === "auth/wrong-password") {
            return res
                .status(400)
                .json({ email: "비밀번호가 일치하지 않습니다." });
        } else {
            return res.status(500).json({
                error: err,
            });
        }
    }
};
exports.signUp = async (req, res) => {
    try {
        let { imgUrls, ...newUser } = req.body;
        const thumbNail =
            imgUrls.length !== 0
                ? imgUrls[0]
                : `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/no-img.jpg?alt=media`;

        newUser.thumbNail = thumbNail;

        const { isValid, errors } = validateData(newUser);
        if (!isValid) return res.status(400).json({ errors });

        const resUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.pw);
        const userId = resUser.user.uid;
        const token = await resUser.user.getIdToken();

        if (token) {
            const userCredentials = {
                username: newUser.username,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                thumbNail: newUser.thumbNail,
                userId,
            };
            db.doc(`/users/${userId}`).set(userCredentials);
            return res.status(200).json({ token });
        } else {
            throw new Error("Interval Server Error");
        }
    } catch (err) {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
            return res
                .status(400)
                .json({ email: "이미 존재하는 email 입니다." });
        } else {
            return res.status(500).json({ general: "Interval Server Error" });
        }
    }
};

exports.getUser = async (req, res) => {
    try {
        return res.status(200).json({ ...req.user });
    } catch (err) {
        return res.status(500).json({
            error: err,
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        console.log(refreshToken);
        await admin.auth().verifyIdToken(refreshToken);
        // await admin.auth().refresh
        const newToken = await admin.auth().currentUser.getIdToken(true);
        return res.status(200).json({ token: newToken });
        //console.log(firebase.auth().currentUser.getIdToken());
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};
// 업로드
// https://mikesukmanowsky.com/firebase-file-and-image-uploads/

const { firebase, Admin, db } = require("../../fbAdmin");
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
                error: "500 서버에러",
            });
        }
    }
};
exports.signUp = async (req, res) => {
    try {
        const noImg = "no-img.jpg";
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            pw: req.body.pw,
        };

        const { isValid, errors } = validateData(newUser);
        if (!isValid) return res.status(400).json({ errors });

        const resUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.pw);
        const userId = resUser.user.uid;
        const token = await resUser.user.getIdToken();

        if (token) {
            const userCredentials = {
                email: newUser.email,
                createdAt: new Date().toISOString,
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt="media`,
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

// 업로드
// https://mikesukmanowsky.com/firebase-file-and-image-uploads/

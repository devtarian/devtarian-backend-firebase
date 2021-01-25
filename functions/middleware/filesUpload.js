const fs = require("fs");
const os = require("os");
const path = require("path");
const Busboy = require("busboy");
const { admin } = require("../fbAdmin");
const config = require("../config");

const filesUpload = function (req, res, next) {
    let fields = {};
    let imgUrls = [];

    const busboy = new Busboy({
        headers: req.headers,
        limits: {
            fileSize: 10 * 1024 * 1024,
        },
    });
    busboy.on("field", (key, value) => {
        fields[key] = JSON.parse(value);
    });
    busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
        if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
            return res.status(400).json({ error: "Wrong file type submit" });
        }

        const extension = filename.split(".")[filename.split(".").length - 1];
        const imageFileName = `${Math.round(
            Math.random() * 1000000
        )}.${extension}`;

        const filepath = path.join(os.tmpdir(), imageFileName);
        file.pipe(fs.createWriteStream(filepath));
        fs.readFile(filepath, (err, buffer) => {
            const size = Buffer.byteLength(buffer);
            console.log({ size, err });
        });
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        imgUrls.push(imageUrl);

        try {
            return await admin
                .storage()
                .bucket(`${config.storageBucket}`)
                .upload(filepath, {
                    resumable: false,
                    metadata: {
                        metadata: {
                            contentType: mimetype,
                        },
                    },
                });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: "Interval server Error" });
        }
    });
    busboy.on("finish", () => {
        req.body = fields.body;
        req.body["imgUrls"] = imgUrls;

        next();
    });
    console.log(4);
    busboy.end(req.rawBody);
    console.log(5);
};

module.exports = filesUpload;
// https://firebasestorage.googleapis.com/v0/b/project-devtarian.appspot.com/o/no-img.jpg?alt=media&token=29d1d1fa-ec09-4b22-ba35-c36b06f8a042

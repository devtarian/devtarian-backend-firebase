const { firebase, db } = require("../../fbAdmin");
const { GeoFirestore } = require("geofirestore");
const computeDistance = require("../../utils/computeDistance");

exports.getSearch = async (req, res) => {
    try {
        const q = req.query.q;
        const lat = req.query.lat;
        const lng = req.query.lng;
        const category = req.query.category || "all";
        const vegType = req.query.vegType || "all";
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const order = req.query.order || "distance";
        const range = req.query.range ? Number(req.query.range) : 6;

        if (!q) {
            return res.status(400).json({ error: "위치를 검색해주세요." });
        }
        const latitude = Number(lat);
        const longitude = Number(lng);
        const geocollection = new GeoFirestore(db).collection("store");
        const storeSnap = await geocollection
            .near({
                radius: range,
                center: new firebase.firestore.GeoPoint(latitude, longitude),
            })
            .get();

        let store = await Promise.all(
            storeSnap.docs.map(async (doc) => {
                let { g, ...rest } = doc.data();
                return {
                    ...rest,
                    id: doc.id,
                    distance: computeDistance(
                        { latitude, longitude },
                        g.geopoint
                    ),
                    favorite: await checkFavorite(req, "storeId", doc.id),
                    imgUrl: rest.info.imgUrls[0] ? rest.info.imgUrls[0] : "",
                };
            })
        );

        if (category !== "all") {
            store = store.filter((item) => item.info.category === category);
        }
        if (vegType !== "all") {
            store = store.filter((item) => item.info.vegType === vegType);
        }

        order === "rated"
            ? store.sort(
                  (a, b) =>
                      Number(b.info.starRating) - Number(a.info.starRating)
              )
            : store.sort((a, b) => Number(a.distance) - Number(b.distance));

        store = store.splice((page - 1) * limit, limit);
        //store.forEach((item) => console.log(item.distance));

        return res.status(200).json(store);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};

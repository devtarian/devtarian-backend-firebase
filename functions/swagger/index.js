const request_review_post = require("./request_review_post.json");
const request_store_post = require("./request_store_post.json");

module.exports = {
    // Import swaggerDefinitions
    swaggerDefinition: {
        info: {
            // API informations (required)
            title: "DevTarian",
            version: "1.0.0",
            description: "DevTarian API Doc \n [Website]: www.example.com",
        },
        scheme: "https:",
        host: "localhost:5001/project-devtarian/asia-northeast3",
        //host: "asia-northeast3-project-devtarian.cloudfunctions.net",
        basePath: "/api",
        definitions: {
            signin: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        format: "string",
                    },
                    pw: {
                        type: "string",
                        format: "string",
                    },
                },
            },
            signinSuccess: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        format: "string",
                    },
                },
            },
            SignupInsertRequest: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        format: "string",
                    },
                    email: {
                        type: "string",
                        format: "string",
                    },
                    pw: {
                        type: "string",
                        format: "string",
                    },
                },
                xml: {
                    name: "User",
                },
            },
            request_store_post,
            request_review_post,
            success_store_post: {},
            success_store_get: {
                type: "object",
                properties: {
                    G: {
                        title: "G",
                        type: "object",
                        properties: {
                            geohash: {
                                example: "wvfn21mpv1",
                                type: "string",
                            },
                            geopoint: {
                                $ref: "#/definitions/Geopoint",
                            },
                        },
                        required: ["geohash", "geopoint"],
                    },
                    Geopoint: {
                        title: "Geopoint",
                        type: "object",
                        properties: {
                            _latitude: {
                                example: 33.4505888422521,
                                type: "number",
                                format: "double",
                            },
                            _longitude: {
                                example: 126.569586220983,
                                type: "number",
                                format: "double",
                            },
                        },
                        required: ["_latitude", "_longitude"],
                    },
                    Coordinates: {
                        title: "Coordinates",
                        type: "object",
                        properties: {
                            _latitude: {
                                example: 33.4505888422521,
                                type: "number",
                                format: "double",
                            },
                            _longitude: {
                                example: 126.569586220983,
                                type: "number",
                                format: "double",
                            },
                        },
                        required: ["_latitude", "_longitude"],
                    },
                    Store: {
                        title: "Store",
                        type: "object",
                        properties: {
                            imgFileURLs: {
                                example: [],
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            addrDetail: {
                                example: "1111111",
                                type: "string",
                            },
                            imgUrls: {
                                example: [
                                    "https://firebasestorage.googleapis.com/v0/b/project-devtarian.appspot.com/o/39021.jpg?alt=media",
                                    "https://firebasestorage.googleapis.com/v0/b/project-devtarian.appspot.com/o/542099.jpeg?alt=media",
                                ],
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            region: {
                                example: "제주",
                                type: "string",
                            },
                            storeName: {
                                example: "가게1",
                                type: "string",
                            },
                            contents: {
                                example: "321321",
                                type: "string",
                            },
                            imgFiles: {
                                example: [],
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            addr: {
                                example: "제주특별자치도 제주시 영평동 2181",
                                type: "string",
                            },
                            step: {
                                example: 2,
                                type: "integer",
                                format: "int32",
                            },
                            menuList: {
                                example: [
                                    {
                                        vegtype: "락토",
                                        menu: "111",
                                        price: "1111",
                                    },
                                    {
                                        price: "2222",
                                        menu: "222",
                                        vegtype: "비건",
                                    },
                                    {
                                        price: "33333",
                                        menu: "333",
                                        vegtype: "비건",
                                    },
                                    {
                                        price: "4444",
                                        menu: "444",
                                        vegtype: "비건",
                                    },
                                ],
                                type: "array",
                                items: {
                                    $ref: "#/definitions/MenuList",
                                },
                            },
                            starRating: {
                                example: 4.5,
                                type: "number",
                                format: "double",
                            },
                            vegType: {
                                example: ["vegan"],
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            operatingHours: {
                                example: [
                                    "월요일 0시 00분 - 0시 00분",
                                    "화요일 0시 00분 - 0시 00분",
                                    "수요일 0시 00분 - 0시 00분",
                                    "목요일 0시 00분 - 0시 00분",
                                    "금요일 0시 00분 - 0시 00분",
                                    "토요일 0시 00분 - 0시 00분",
                                    "일요일 0시 00분 - 0시 00분",
                                ],
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            contactNum: {
                                example: "111111111111",
                                type: "string",
                            },
                            address: {
                                type: "string",
                            },
                        },
                        required: [
                            "imgFileURLs",
                            "addrDetail",
                            "imgUrls",
                            "region",
                            "storeName",
                            "contents",
                            "imgFiles",
                            "addr",
                            "step",
                            "menuList",
                            "starRating",
                            "vegType",
                            "operatingHours",
                            "contactNum",
                            "address",
                        ],
                    },
                    MenuList: {
                        title: "MenuList",
                        type: "object",
                        properties: {
                            vegtype: {
                                example: "락토",
                                type: "string",
                            },
                            menu: {
                                example: "111",
                                type: "string",
                            },
                            price: {
                                example: "1111",
                                type: "string",
                            },
                        },
                        required: ["vegtype", "menu", "price"],
                    },
                    Review: {
                        title: "Review",
                        type: "object",
                        properties: {
                            id: {
                                example: "iyvunsny7gkMBV1QrwBE",
                                type: "string",
                            },
                            likes: {
                                example: 0,
                                type: "integer",
                                format: "int32",
                            },
                            createdAt: {
                                example: "2021-01-06T08:47:30.167Z",
                                type: "string",
                            },
                            contents: {
                                example: "리뷰22222222222222222222222222222222",
                                type: "string",
                            },
                            title: {
                                example: "리뷰22222",
                                type: "string",
                            },
                            vegLevel: {
                                example: "락토오보",
                                type: "string",
                            },
                            likesOfMe: {
                                example: false,
                                type: "boolean",
                            },
                            category: {
                                example: "가게",
                                type: "string",
                            },
                            imgUrls: {
                                example: [
                                    "https://firebasestorage.googleapis.com/v0/b/project-devtarian.appspot.com/o/109939.jpg?alt=media",
                                    "https://firebasestorage.googleapis.com/v0/b/project-devtarian.appspot.com/o/54281.jpeg?alt=media",
                                ],
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            reviewCount: {
                                example: 3,
                                type: "integer",
                                format: "int32",
                            },
                            writer: {
                                example: "bbbbb",
                                type: "string",
                            },
                            starRating: {
                                example: 3.5,
                                type: "number",
                                format: "double",
                            },
                        },
                        required: [
                            "id",
                            "likes",
                            "createdAt",
                            "contents",
                            "title",
                            "vegLevel",
                            "likesOfMe",
                            "category",
                            "imgUrls",
                            "reviewCount",
                            "writer",
                            "starRating",
                        ],
                    },
                },
            },
        },
    },
    // Path to the API docs
    apis: [
        // "./routes/main/index.js",
        "./routes/auth/index.js",
        "./routes/store/index.js",
        "./models/User/index.js",
        "./roles/index.js",
    ],
};

// https://editor.swagger.io/?_ga=2.119185673.1209193922.1607668896-1975227221.1605015253

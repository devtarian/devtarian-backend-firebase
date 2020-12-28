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
            result_post: {
                type: "object",
                properties: {
                    MenuList: {
                        title: "MenuList",
                        type: "object",
                        properties: {
                            vegtype: {
                                example: "비건",
                                type: "string",
                            },
                            price: {
                                example: "111",
                                type: "string",
                            },
                            menu: {
                                example: "111",
                                type: "string",
                            },
                        },
                        required: ["vegtype", "price", "menu"],
                    },
                    Coordinates: {
                        title: "Coordinates",
                        type: "object",
                        properties: {
                            _latitude: {
                                example: 33.4505989030939,
                                type: "number",
                                format: "double",
                            },
                            _longitude: {
                                example: 126.569887323206,
                                type: "number",
                                format: "double",
                            },
                        },
                        required: ["_latitude", "_longitude"],
                    },
                    G: {
                        title: "G",
                        type: "object",
                        properties: {
                            geopoint: {
                                $ref: "#/definitions/Geopoint",
                            },
                            geohash: {
                                example: "wvfn21mru5",
                                type: "string",
                            },
                        },
                        required: ["geopoint", "geohash"],
                    },
                    Geopoint: {
                        title: "Geopoint",
                        type: "object",
                        properties: {
                            _latitude: {
                                example: 33.4505989030939,
                                type: "number",
                                format: "double",
                            },
                            _longitude: {
                                example: 126.569887323206,
                                type: "number",
                                format: "double",
                            },
                        },
                        required: ["_latitude", "_longitude"],
                    },
                    Comment: {
                        title: "Comment",
                        type: "object",
                        properties: {
                            description: {
                                example: "zzzz",
                                type: "string",
                            },
                            postId: {
                                example: "Yj4ejesvSThZuwdg9hxq",
                                type: "string",
                            },
                        },
                        required: ["description", "postId"],
                    },
                },
            },
        },
    },
    // Path to the API docs
    apis: [
        "./routes/auth/index.js",
        "./routes/post/index.js",
        "./models/User/index.js",
        "./roles/index.js",
    ],
};

// https://editor.swagger.io/?_ga=2.119185673.1209193922.1607668896-1975227221.1605015253

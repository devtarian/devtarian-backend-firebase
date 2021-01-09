const request_review_post = require("./request_review_post.json");
const request_store_post = require("./request_store_post.json");
const success_comment_post = require("./success_comment_post.json");
const success_store_get = require("./success_store_get.json");
const success_auth_me_get = require("./success_auth_me_get.json");

module.exports = {
    swaggerDefinition: {
        info: {
            title: "DevTarian",
            version: "1.0.0",
            description: "DevTarian API Doc \n [Website]: www.example.com",
        },
        scheme: "https:",
        host: "localhost:5001/project-devtarian/asia-northeast3",
        //host: "asia-northeast3-project-devtarian.cloudfunctions.net",
        basePath: "/api",
        definitions: {
            request_signin_post: {
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

            request_signup_post: {
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
            request_comment_post: {
                type: "object",
                properties: {
                    contents: {
                        type: "string",
                        format: "string",
                    },
                },
            },
            success_signin_post: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        format: "string",
                    },
                },
            },
            success_auth_me_get,
            success_store_post: {},
            success_store_get,
            success_comment_post,
        },
    },
    // Path to the API docs
    apis: [
        "./routes/main/index.js",
        "./routes/auth/index.js",
        "./routes/store/index.js",
        "./models/User/index.js",
        "./roles/index.js",
    ],
};

// https://editor.swagger.io/?_ga=2.119185673.1209193922.1607668896-1975227221.1605015253

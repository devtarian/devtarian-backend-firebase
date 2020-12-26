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
        },
    },
    // Path to the API docs
    apis: [
        "./routes/auth/index.js",
        "./models/User/index.js",
        "./roles/index.js",
    ],
};

// https://editor.swagger.io/?_ga=2.119185673.1209193922.1607668896-1975227221.1605015253

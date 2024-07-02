require("dotenv-flow").config();

const config = require("./appsettings");

if (process.env.DEPLOYMENT === "false") {
    const http = require("http");
    const debug = require("debug");

    async function main() {
        try {
            const app = await require("./startup.js")(config);
            http.createServer(app).listen(config.port, () => {
                console.log(`Listening port: ${config.port}`);
                debug(`Listening port: ${config.port}`);
            });
        } catch (e) {
            console.error(e);
            debug("ERROR", e);
        }
    }

    main();
}

if (process.env.DEPLOYMENT === "true") {
    const { onRequest } = require("firebase-functions/v2/https");
    const { generateErrorResponse } = require("./utils/responseParser");
    const errorMessages = require("./errorMessages.js");

    const appPromise = require("./startup.js")(config);

    exports.api = onRequest(async (req, res) => {
        try {
            const app = await appPromise;
            app(req, res);
        } catch (error) {
            console.error("Error initializing app:", error);
            res.status(500).send(generateErrorResponse(errorMessages.general()));
        }
    });
}

const { createContainer, asValue, Lifetime } = require("awilix");
const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require("./appsettings.js");

const buildCollections = async () => {
    const client = new MongoClient(config.mongodb.default, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();
    const db = client.db("service");

    const accounts = db.collection("accounts");
    const address = db.collection("address");
    const brands = db.collection("brands");
    const categories = db.collection("categories");
    const follows = db.collection("follows");
    const phoneCodes = db.collection("phoneCodes");
    const products = db.collection("products");
    const refreshTokens = db.collection("refreshTokens");
    const shops = db.collection("shops");
    const users = db.collection("users");
    const wishlists = db.collection("wishlists");

    return {
        accounts,
        address,
        brands,
        categories,
        follows,
        phoneCodes,
        products,
        refreshTokens,
        shops,
        users,
        wishlists,
    }
}

const container = createContainer();

async function setup() {
    const collections = await buildCollections();

    container.loadModules(["repositories/*Repository.js", "src/*/*CommonFunction.js"], { resolverOptions: { lifetime: Lifetime.SINGLETON } });

    container.register({
        config: asValue(config),
        collections: asValue(collections)
    });
}


module.exports = { container, setup };
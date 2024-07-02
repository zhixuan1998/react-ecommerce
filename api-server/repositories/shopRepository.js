const { ObjectId } = require('mongodb');
const { Shop } = require("../aggregate");
const sortDirectionEnum = require("../enum/sortDirection");

module.exports = ({
    collections: {
        follows,
        shops,
    }
}) => {
    return {
        async getAll() {
            try {
                const result = await shops.find({}).toArray();

                return [null, result.length ? result.map(r => new Shop(r)) : null];

            } catch (error) {
                return [error];
            }
        },

        async getUserFollowed(userId) {
            try {
                const result = await follows.aggregate([
                    {
                        $match: {
                            userId: new ObjectId(userId),
                            type: followTypeEnum.Shop,
                            isDeleted: false
                        }
                    },
                    {
                        $lookup: {
                            from: brands.collectionName,
                            let: { shopId: "$referenceId" },
                            as: "brands",
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$brandId", "$_id"] },
                                                { $eq: ["$isEnable", true] },
                                                { $eq: ["$isDeleted", false] }
                                            ]
                                        }
                                    }
                                },
                            ]
                        }
                    },
                    { $match: { "brands.0": { $exists: true } } },
                    { $unwind: "$brands" },
                    { $replaceRoot: { newRoot: "brands" } }
                ]).toArray();

                return [null, result.length ? result.map(r => new Brand(r)) : null];

            } catch (error) {
                return [error];
            }
        }
    }
}
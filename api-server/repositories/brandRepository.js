const { ObjectId } = require("mongodb");
const { Brand } = require("../aggregate");
const followTypeEnum = require("../enum/followType");

module.exports = ({ collections: { brands, follows, products } }) => {
    return {
        async getAll({ search, brandIds }) {
            let initQuery = {
                isEnable: true,
                isDeleted: false
            };

            if (search) {
                initQuery.name = { $regex: "^" + search, $options: "i" };
            }

            if (brandIds?.length) {
                initQuery._id = { $in: brandIds.map((id) => new ObjectId(id)) };
            }

            try {
                const result = await brands.aggregate([
                    { $match: initQuery },
                    {
                        $lookup: {
                            from: products.collectionName,
                            let: { brandId: "$_id" },
                            as: "products",
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$brandId", "$$brandId"] },
                                        isEnable: true,
                                        isDeleted: false
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: follows.collectionName,
                            let: { brandId: "$_id" },
                            as: "followers",
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$referenceId", "$$brandId"] },
                                        type: followTypeEnum.BRAND,
                                        isDeleted: false
                                    }
                                }
                            ]
                        }
                    },
                    { $addFields: { productCount: { $size: "$products" }, followerCount: { $size: "$followers" } } },
                    {
                        $project: {
                            products: 0,
                            followers: 0
                        }
                    }
                ]).toArray();

                return [null, result.length ? result : null];
            } catch (error) {
                return [error];
            }
        },

        async getUserFollowed(userId) {
            try {
                const result = await follows
                    .aggregate([
                        {
                            $match: {
                                userId: new ObjectId(userId),
                                type: followTypeEnum.BRAND,
                                isDeleted: false
                            }
                        },
                        {
                            $lookup: {
                                from: brands.collectionName,
                                let: { brandId: "$referenceId" },
                                as: "brands",
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ["$brandId", "$_id"] },
                                            isEnable: true,
                                            isDeleted: false
                                        }
                                    }
                                ]
                            }
                        },
                        { $match: { "brands.0": { $exists: true } } },
                        { $unwind: "$brands" },
                        { $replaceRoot: { newRoot: "brands" } }
                    ])
                    .toArray();

                return [null, result.length ? result.map((r) => new Brand(r)) : null];
            } catch (error) {
                return [error];
            }
        }
    };
};

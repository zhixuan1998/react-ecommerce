const { ObjectId } = require('mongodb');
const followTypeEnum = require("../enum/followType");
const { Follow } = require("../aggregate");

module.exports = ({
    collections: {
        brands,
        follows,
        shops,
    }
}) => {
    return {
        async add(userId, follow) {
            const followData = {
                userId: new ObjectId(userId),
                type: follow.type,
                referenceId: new ObjectId(follow.referenceId),
                isDeleted: follow.isDeleted,
                createdAt: follow.createdAt,
                createdBy: new ObjectId(userId),
                modifiedAt: follow.modifiedAt,
                modifiedBy: new ObjectId(userId),
            }

            try {
                const result = await follows.insertOne(followData);

                const insertedId = result.insertedId;

                const insertedResult = await follows.findOne({ _id: insertedId });

                return [null, new Follow(insertedResult)];

            } catch (error) {
                return [error];
            }
        },

        async getAllWithReferenceObject({ type, userId }) {
            try {
                let initQuery = {
                    userId: new ObjectId(userId),
                    isDeleted: false
                }

                let pipeline = [];

                if (type) {
                    initQuery.type = type;

                    const collection = type === followTypeEnum.BRAND ? brands : shops;

                    pipeline = [
                        { $match: initQuery },
                        {
                            $lookup: {
                                from: collection.collectionName,
                                let: { referenceId: "$referenceId" },
                                as: "referenceObject",
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: { $eq: ["$_id", "$$referenceId"] },
                                            isEnable: true,
                                            isDeleted: false
                                        }
                                    }
                                ]
                            }
                        },
                        { $match: { "$referenceObject.0": { $exists: true } } },
                        { $unwind: "$referenceObject" },
                        { $sort: { createdAt: 1 } },
                        { $replaceRoot: { newRoot:  "$referenceObject" } }
                    ];
                }

                pipeline.unshift({ $match: initQuery });

                const result = await follows.aggregate(pipeline).toArray();

                return [null, result.length ? result : null];

            } catch (error) {
                return [error];
            }
        },

        async delete(userId, referenceId) {
            try {
                const date = new Date();

                const result = await follows.updateOne(
                    {
                        userId: new ObjectId(userId),
                        referenceId: new ObjectId(referenceId),
                        isDeleted: false
                    },
                    {
                        $set: {
                            isDeleted: true,
                            modifiedAt: date,
                            modifiedBy: new ObjectId(userId)
                        }
                    }
                );

                return [null, result.modifiedCount ? true : false];

            } catch (error) {
                return [error];
            }
        }
    }
}
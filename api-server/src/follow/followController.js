const { createController } = require("awilix-express");
const { generateSuccessResponse, generateErrorResponse } = require("../../utils/responseParser");
const errorMessages = require("../../errorMessages");
const { Follow } = require("../../aggregate");

const controller = ({
    config,
    followRepository
}) => {

    return {
        async createFollow(req, res) {
            try {
                const user = req.httpContext.user;

                if (!user)
                    return res.status(403).send(generateErrorResponse(errorMessages.forbidden()));

                const userId = user.id;

                const { type, referenceId } = req.body;

                const [existingFollowError, existingFollow] = await followRepository.get(userId, referenceId);

                if (existingFollowError)
                    throw existingFollowError;

                if (existingFollow)
                    return res.status(400).send(generateErrorResponse());

                const followData = new Follow({
                    userId,
                    type,
                    referenceId
                });

                const [addFollowError, addFollow] = await followRepository.add(userId, followData);

                if (addFollowError)
                    throw addFollowError;

                return res.status(200).send(generateSuccessResponse());

            } catch (err) {
                // console.log(err);
                return res.status(500).send(generateErrorResponse());
            }
        },

        async deleteFollow(req, res) {
            try {
                const user = req.httpContext.user;

                if (!user)
                    return res.status(403).send(generateErrorResponse(errorMessages.forbidden()));

                const userId = user.id;

                const { type, referenceId } = req.body;

                const [followError, follow] = await followRepository.get(userId, referenceId);

                if (followError)
                    throw followError;

                if (!follow)
                    return res.status(404).send(generateErrorResponse());

                const [deleteFollowError, deleteFollow] = await followRepository.delete(userId, referenceId);

                if (deleteFollowError)
                    throw deleteFollowError;

                return res.status(200).send(generateSuccessResponse());

            } catch (err) {
                // console.log(err);
                return res.status(500).send(generateErrorResponse());
            }
        }


    }
}

module.exports = createController(controller)
    .prefix("/api")
    .post("users/follows", "createFollow")
    .delete("users/follows/:followId", "deleteFollow")
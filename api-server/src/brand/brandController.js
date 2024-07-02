const { createController } = require("awilix-express");
const { generateSuccessResponse, generateErrorResponse } = require("../../utils/responseParser");
const errorMessages = require("../../errorMessages");
const { Brand } = require("../../aggregate");
const followTypeEnum = require("../../enum/followType");

const controller = ({ config, brandRepository, followRepository }) => {
    return {
        async getBrands(req, res) {
            try {
                const { brandIds } = req.query;

                const [brandsError, brands] = await brandRepository.getAll({ brandIds });

                if (brandsError) throw brandsError;

                let response = brands ? brands.map((r) => {
                    const brandId = r.getId();

                    const { baseUrl } = config.image;
                    const { logoPath } = config.brand;

                    const logoUrl = new URL(logoPath.replace("{brandId}", brandId), baseUrl).href;

                    return {
                        brandId,
                        name: r.name,
                        logoUrl
                    };
                }) : [];

                return res.status(200).send(generateSuccessResponse(response));
            } catch (err) {
                // console.log(err);
                return res.status(500).send(generateErrorResponse());
            }
        },

        async getUserFollowed(req, res) {
            try {
                const user = req.httpContext.user;

                if (!user) return res.status(403).send(generateErrorResponse(errorMessages.forbidden()));

                const userId = user.id;

                const [followsError, follows] = await followRepository.getAllWithReferenceObject({
                    type: followTypeEnum.BRAND,
                    userId
                });

                if (followsError) throw followsError;

                let response = follows ? follows.map((r) => {
                    const brand = new Brand(r.referenceObject);

                    return {
                        brandId: brand.getId(),
                        name: brand.name
                    };
                }) : [];

                return res.status(200).send(generateSuccessResponse(response));
            } catch (err) {
                // console.log(err);
                return res.status(500).send(generateErrorResponse());
            }
        }
    };
};

module.exports = createController(controller)
    .prefix("/api")
    .get("/users/brands", "getBrands")
    .get("/users/followedBrands", "getUserFollowedBrands");

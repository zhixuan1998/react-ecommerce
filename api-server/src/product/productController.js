const { createController } = require("awilix-express");
const { generateSuccessResponse, generateErrorResponse } = require("../../utils/responseParser");
const errorMessages = require("../../errorMessages");
const followTypeEnum = require("../../enum/followType");
const controller = ({
    config,
    productRepository,
    // wishlistRepository,

    listingCommonFunction
}) => {

    return {
        async getProducts(req, res) {
            try {
                let {
                    search,
                    categoryIds = [],
                    brandIds = [],
                    isFollowedBrand,
                    isFollowedShop,
                    isWishlist,
                    limit,
                    page,
                } = req.body;

                search = decodeURI(search);

                const user = req.httpContext?.user;

                if ((isFollowedBrand === true || isFollowedShop === true || isWishlist === true) && !user)
                    return res.status(403).send(generateErrorResponse(errorMessages.forbidden()));

                const userId = user?.id;

                if (isFollowedBrand === true) {
                    const [followedBrandsError, followedBrands] = await followRepository.getAll({
                        userId,
                        type: followTypeEnum.BRAND
                    });

                    if (followedBrandsError)
                        throw followedBrandsError;

                    if (followedBrands) {
                        brandIds = [...new Set(brandIds.concat(followedBrands.map(r => r.getReferenceId())))];
                    }
                }

                if (isFollowedShop === true) {
                    const [followedShopsError, followedShops] = await followRepository.getAll({
                        userId,
                        type: followTypeEnum.SHOP
                    });

                    if (followedShopsError)
                        throw followedShopsError;

                    if (followedShops) {
                        shopIds = [...new Set(shopIds.concat(followedShops.map(r => r.getReferenceId())))];
                    }
                }

                let productIds = [];

                // if (isWishlist === true) {
                //     const [wishlistsError, wishlists] = await wishlistRepository.getAll(userId);

                //     if (wishlistsError)
                //         throw wishlistsError;

                //     if (wishlists) {
                //         productIds.concat(wishlists.map(r => r.getProductId()));
                //     }
                // }

                const filterData = {
                    search,
                    productIds,
                    categoryIds,
                    brandIds
                }

                const [productAndPaginationError, productAndPagination] = await listingCommonFunction.getListingAndPagination({
                    listingFunction: productRepository.getAll,
                    countFunction: productRepository.getCount,
                    limit,
                    page,
                    filterData
                });

                if (productAndPaginationError)
                    throw productAndPaginationError;

                const { listing: products, pagination } = productAndPagination;

                let response = products ? products.map(r => {
                    const productId = r.getId();

                    const { baseUrl } = config.image;
                    const { logoPath, imagePath } = config.product;

                    const logoUrl = new URL(logoPath.replace("{productId}", productId), baseUrl).href;

                    const images = r.imageIds.map(objectId => {
                        const imageId = objectId.toString();

                        return {
                            imageId: imageId,
                            imageUrl: new URL(imagePath.replace("{productId}", productId).replace("{imageId}", imageId), baseUrl).href
                        }
                    })

                    return {
                        productId,
                        logoUrl,
                        images,
                        name: r.name,
                        description: r.description,
                        unitPrice: parseFloat(r.unitPrice),
                        quantity: r.quantity,
                        brandId: r.getBrandId(),
                        categoryIds: r.getCategoryIds()
                    }
                }) : [];

                return res.status(200).send(generateSuccessResponse(response, pagination));

            } catch (err) {
                console.log(err);
                return res.status(500).send(generateErrorResponse());
            }
        }
    }
}

module.exports = createController(controller)
    .prefix("/api")
    .post("/users/products", "getProducts")
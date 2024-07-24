import createCategoryRepository from './categoryRepository';
import createProductRepository from './productRepository';
import createLookupRepository from './lookupRepository';
import createBrandRepository from './brandRepository';
import createTokenRepository from './tokenRepository';
import createUserRepository from './userRepository';

export default (config) => ({
    categoryRepository: createCategoryRepository(config),
    productRepository: createProductRepository(config),
    lookupRepository: createLookupRepository(config),
    brandRepository: createBrandRepository(config),
    tokenRepository: createTokenRepository(config),
    userRepository: createUserRepository(config)
});

import httpClient from '@/utils/http';

const brandRepository = (config) => {
    return {
        async getAll({ brandIds }) {
            return await httpClient.get('/users/brands', { brandIds });
        }
    };
};

export default brandRepository;

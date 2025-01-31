import httpClient from '@/utils/http';

const categoryRepository = (config) => {
    return {
        async getAll({ categoryIds }) {
            return await httpClient.get('/users/categories', { categoryIds });
        }
    };
};

export default categoryRepository;

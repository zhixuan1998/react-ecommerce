import httpClient from '@/utils/http';

const followRepository = (config) => {
    return {
        async createFollow({ brandId }) {
            return await httpClient.post('/users/follows', { brandId });
        },
        async deleteFollow({ brandId }) {
            return await httpClient.delete(`/users/follows/brands/${brandId}`);
        }
    };
};

export default followRepository;

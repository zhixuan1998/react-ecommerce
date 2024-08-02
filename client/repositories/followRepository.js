import httpClient from '@/utils/http';

const followRepository = (config) => {
    return {
        async createFollow({ type, referenceId }) {
            return await httpClient.post('/users/follows', { type, referenceId });
        },
        async deleteFollow({ type, referenceId }) {
            return await httpClient.delete('/users/follows', { type, referenceId });
        }
    };
};

export default followRepository;

import httpClient from '@/utils/http';

const userRepository = (config) => {
    return {
        async getUser(userId) {
            return await httpClient.get(`/users/${userId}`);
        },
        async login({ username, password }) {
            return await httpClient.post(`/users/login`, { username, password });
        }
    };
};

export default userRepository;

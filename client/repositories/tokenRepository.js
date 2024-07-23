import httpClient from '@/utils/http';

const tokenRepository = (config) => {
    return {
        async refreshToken() {
            return await httpClient.post(`users/token`).then(({ data: { data } }) => {
                localStorage.setItem('accessToken', data.accessToken);
            });
        }
    };
};

export default tokenRepository;

import axios from 'axios';
import config from '../../appsettings';
import $repositories from '../../repositories';

const ERROR_CODE = {
    TOKEN_EXPIRED: 1100,
    FINGERPRINT_MISMATCH: 1102
};

let isRefreshing = false;
let queue = [];

const BASIC_AUTH = `Basic ${btoa(
    `${config.service.security.clientId}:${config.service.security.clientSecret}`
)}`;

const httpClient = axios.create({
    baseURL: config.service.baseURL,
    withCredentials: true
});

httpClient.interceptors.request.use(async (config) => {
    config.headers['Authorization'] =
        localStorage.getItem('accessToken') === null
            ? BASIC_AUTH
            : `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

httpClient.interceptors.response.use(
    (res) => ({ data: res.data.data }),
    async (error) => {
        const { status, data } = error.response ?? {};

        const originalRequest = error.config;

        const IS_TOKEN_EXPIRED_ERROR = isUnauthorizedError(status, data, ERROR_CODE.TOKEN_EXPIRED);
        const IS_FINGERPRINT_MISMATCH_ERROR = isUnauthorizedError(
            status,
            data,
            ERROR_CODE.FINGERPRINT_MISMATCH
        );

        if (IS_TOKEN_EXPIRED_ERROR || IS_FINGERPRINT_MISMATCH_ERROR) {
            localStorage.removeItem('accessToken');
        }

        if (IS_TOKEN_EXPIRED_ERROR) {
            return [handleTokenExpiredError(originalRequest)];
        }

        if (IS_FINGERPRINT_MISMATCH_ERROR) {
            return [handleFingerprintMismatchError(originalRequest)];
        }

        return { error };
    }
);

const isUnauthorizedError = (status, data, errorCode) =>
    status === 401 && data?.status.code === errorCode;

/**
 * Handles the case when a token expires during an HTTP request.
 * @param {Object} originalRequest - The original request object that triggered the token expired error.
 * @returns {Promise} - A promise that resolves with the response of the original request if the token refresh is successful,
 *                      or rejects with the refresh error if any error occurs.
 */
async function handleTokenExpiredError(originalRequest) {
    try {
        if (isRefreshing) {
            const promise = new Promise((resolve, reject) => {
                queue.push({ resolve, reject, originalRequest });
            });

            return await promise.then((request) => httpClient(request)).catch((error) => error);
        }

        isRefreshing = true;

        try {
            await $repositories.tokenRepository.refreshToken();
        } finally {
            isRefreshing = false;
        }

        while (queue.length > 0) {
            const { resolve, originalRequest } = queue.shift();
            resolve(originalRequest);
        }

        return httpClient(originalRequest);
    } catch (refreshError) {
        isRefreshing = false;

        while (queue.length > 0) {
            const { reject, originalRequest } = queue.shift();
            reject(originalRequest);
        }

        return refreshError;
    }
}

function handleFingerprintMismatchError(originalRequest) {
    return httpClient(originalRequest);
}

export default httpClient;

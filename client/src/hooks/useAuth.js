import { useDispatch, useSelector } from 'react-redux';
import userSlice from '@/features/Auth/userSlice';
import httpClient from '@/utils/http';

function useAuth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    async function login({ email, password }) {
        const encodedPassword = btoa(password);

        const success = await httpClient
            .post(`users/login`, { email, password: encodedPassword })
            .then(async ({ data: { data } }) => {
                localStorage.setItem('accessToken', data.accessToken);
                await getUser();
                return true;
            })
            .catch(() => {
                return false;
            });

        return success;
    }

    async function register({ firstName, lastName, email, dob, phoneCode, phoneNumber, password }) {
        const encodedPassword = btoa(password);

        const success = await httpClient
            .post(`users/register`, {
                firstName,
                lastName,
                email,
                dob,
                phoneCode,
                phoneNumber,
                password: encodedPassword
            })
            .then(() => {
                login({ email, password });
                return true;
            })
            .catch(() => {
                return false;
            });

        return success;
    }

    async function socialLogin({ accessToken, provider }) {
        const success = await httpClient
            .post(`users/socialLogin`, {
                accessToken,
                provider
            })
            .then(async ({ data: { data } }) => {
                localStorage.setItem('accessToken', data.accessToken);
                await getUser();
                return true;
            })
            .catch(() => {
                return false;
            });

        return success;
    }

    async function getUser() {
        if (!localStorage.getItem('accessToken')) return;

        await httpClient
            .get(`users`)
            .then(({ data: { data } }) => {
                if (!data) return;

                dispatch(userSlice.updateUser(data));
                
            })
            .catch(() => {});
    }

    async function logout() {
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };

        await httpClient.post(`users/logout`, { headers }).then(() => {
            localStorage.removeItem('accessToken');
        });
    }

    return { user, login, register, socialLogin, getUser, logout };
}

export default useAuth;

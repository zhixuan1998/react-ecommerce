import httpClient from '@/utils/http';
import userSlice from '@/features/Auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function useAuth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    async function login({ email, password }) {
        const encodedPassword = btoa(password);

        const { data, error } = await httpClient.post(`users/login`, {
            email,
            password: encodedPassword
        });

        if (error) {
            return false;
        }

        localStorage.setItem('accessToken', data.accessToken);
        await getUser();

        return true;
    }

    async function register({ firstName, lastName, email, dob, phoneCode, phoneNumber, password }) {
        const encodedPassword = btoa(password);

        const { error } = await httpClient.post(`users/register`, {
            firstName,
            lastName,
            email,
            dob,
            phoneCode,
            phoneNumber,
            password: encodedPassword
        });

        if (error) {
            return false;
        }

        login({ email, password });

        return true;
    }

    async function socialLogin({ accessToken, provider }) {
        const { data, error } = await httpClient.post(`users/socialLogin`, {
            accessToken,
            provider
        });

        if (error) {
            return false;
        }

        localStorage.setItem('accessToken', data.accessToken);
        await getUser();

        return true;
    }

    async function getUser() {
        if (!localStorage.getItem('accessToken')) return;

        const { data } = await httpClient.get(`users`);

        if (data) {
            dispatch(userSlice.updateUser(data));
        }
    }

    async function logout() {
        const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };

        const { error } = await httpClient.post(`users/logout`, { headers });

        if (error) {
            localStorage.removeItem('accessToken');
        }
    }

    return { user, login, register, socialLogin, getUser, logout };
}

export default useAuth;

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import config from '../../appsettings';

const PROVIDER_INSTANCE = {
    GOOGLE: GoogleAuthProvider,
    FACEBOOK: FacebookAuthProvider
};

const firebaseConfig = config.firebase.config;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function customConfiguration(provider, providerType) {
    let customParameters = {};

    switch (providerType) {
        case 'google':
            provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
            break;
        // case 'facebook':
        //     provider.addScope('email');
        //     provider.addScope('user_birthday');
        //     customParameters.display = 'popup';
        //     break;
    }

    provider.setCustomParameters(customParameters);
}

function useFirebaseAuth(providerTypes) {
    let providerGroup = {};

    try {
        if (!Array.isArray(providerTypes) || !providerTypes?.length) return providerGroup;

        providerTypes.map((providerType) => {
            let Provider = PROVIDER_INSTANCE[providerType.toUpperCase()];

            if (!Provider || providerGroup[providerType]) return providerGroup;

            let provider = new Provider();

            customConfiguration(provider, providerType);

            async function signIn() {
                try {
                    const result = await signInWithPopup(auth, provider);
                    // const credential = Provider.credentialFromResult(result);
                    const accessToken = result?.user.accessToken;
                    const user = result.user;
                    return { user, accessToken };
                } catch (error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.email;
                    const credential = Provider.credentialFromError(error);
                    return { errorCode, errorMessage, email, credential };
                }
            }

            providerGroup[providerType] = { signIn };
        });
    } catch (error) {}

    return providerGroup;
}

export default useFirebaseAuth;

export default {
  service: {
      baseURL: import.meta.env.VITE_SERVICE__BASE_URL,
      security: {
          clientId: import.meta.env.VITE_SERVICE__SECURITY__CLIENT_ID,
          clientSecret: import.meta.env.VITE_SERVICE__SECURITY__CLIENT_SECRET
      }
  },
  firebase: {
      config: {
          apiKey: import.meta.env.VITE_FIREBASE__CONFIG__API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE__CONFIG__AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE__CONFIG__PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE__CONFIG__STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE__CONFIG__MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE__CONFIG__APP_ID
      }
  },
}
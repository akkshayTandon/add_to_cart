const appSettings = {
    apiKey: import.meta.env.VITE_FIREBASE_CONFIG_API_KEY ,
    authDomain: import.meta.env.VITE_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_CONFIG_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_CONFIG_APP_ID
}

export default appSettings;
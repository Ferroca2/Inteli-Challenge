import { initializeApp } from 'firebase/app';
import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(() => {
    initializeApp({
        apiKey: 'AIzaSyCXNWRbfulaZabgTss-y2XaBK72vqZyqis',
        authDomain: 'crypto-reports-app.firebaseapp.com',
        projectId: 'crypto-reports-app',
        storageBucket: 'crypto-reports-app.appspot.com',
        messagingSenderId: '930323585076',
        appId: '1:930323585076:web:ef0bdf44bda9bec1bf9261',
        measurementId: 'G-T2LX306E6M',
    });
});

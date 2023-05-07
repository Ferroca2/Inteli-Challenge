import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const getEventsData = functions.https.onRequest(
    (...args) => import('./getEventsData')
        .then(async m => { await m.default(...args); })
);

export const getCoinsData = functions.https.onRequest(
    (...args) => import('./getCoinsData')
        .then(async m => { await m.default(...args); })
);


export const getNewsletter = functions.runWith({timeoutSeconds: 540}).https.onRequest(
    (...args) => import('./getNewsletter')
        .then(async m => { await m.default(...args); })
);



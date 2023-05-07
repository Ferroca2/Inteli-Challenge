import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const eventsApi = axios.create({
    baseURL: 'http://localhost:9000/api/events-data',
});

const newsApi = axios.create({
    baseURL: 'http://localhost:9000/api/news',
});

const harthosApi = axios.create({
    baseURL: 'http://localhost:9000/api/mint',
});

export default boot(({ app }) => {

    Object.assign(app.config.globalProperties, {
        $axios: axios,
        $eventsApi: eventsApi,
        $newsApi: newsApi,
        $harthosApi: harthosApi,
    });

});

export { axios, eventsApi, newsApi, harthosApi };




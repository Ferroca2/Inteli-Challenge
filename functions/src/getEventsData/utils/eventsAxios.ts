import axios from 'axios';

export default axios.create({
    headers: {
        'x-api-key': process.env.EVENT_KEY as string,
        'Accept-Encoding': 'gzip, deflate',
        'Accept': 'application/json',
    },
    baseURL: 'https://developers.coinmarketcal.com/v1/events',
});

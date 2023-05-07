import axios from 'axios';

export default axios.create({
    headers: {
        'Accept-Encoding': 'gzip, deflate',
        'Accept': 'application/json',
    },
    params: { 'x-apikey': process.env.COINS_KEY },
    baseURL: 'https://databar.ai/api/v3/table/CUprmFi5KLyVjqjUSoMfLA',
});

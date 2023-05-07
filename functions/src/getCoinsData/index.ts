
import { Request, Response } from 'firebase-functions';
import { Method } from 'axios';

import coinsAxios from './utils/coinsAxios';

export default async function coinsAPI(req: Request, res: Response) {

    const path = req.path.replace('/api/coins-data', '');

    const { status, data } = await coinsAxios.request({
        url: path,
        method: req.method as Method,
        params: req.query,
        validateStatus: () => true,
    });

    return res.status(status).json(data);
}

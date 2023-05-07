
import { Request, Response } from 'firebase-functions';
import { Method } from 'axios';

import eventsAxios from './utils/eventsAxios';

export default async function eventsAPI(req: Request, res: Response) {

    const path = req.path.replace('/api/events-data', '');

    const { status, data } = await eventsAxios.request({
        url: path,
        method: req.method as Method,
        params: req.query,
        validateStatus: () => true,
    });

    return res.status(status).json(data);
}

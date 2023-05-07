import axios from 'axios';
import { Request, Response } from 'firebase-functions';

export default async function mintGovernanceTokens(req: Request, res: Response) {
    console.log('ferroca');
    if (req.method.toUpperCase() !== 'POST') {
        return res.status(405).json({
            message: 'Método não permitido',
        });
    }

    if (req.query.batch) {
        return res.status(422).json({
            message: 'Requisições em lote não suportadas',
        });
    }

    if (!req.body.address || typeof req.body.address !== 'string') {
        return res.status(422).json({
            message: 'Endereço não informado',
        });
    }

    const address = req.body.address;

    const { data } = await axios.post('http://localhost:8000/wallet/mint-tokens', {
        token: '00ac58b0d9a9f86e1ccdfcd4286d3258f486b843313979440b48b99c04c0f1f1',
        amount: 1,
        address,
    }, {
        headers: {
            'Content-Type': 'application/json',
            'x-wallet-id': '123',
        },
    });

    if (data.success) {
        return res.status(200).json({
            message: 'Tokens mintados',
        });
    } else {
        return res.status(500).json({
            message: 'Erro ao mintar tokens',
        });
    }
}

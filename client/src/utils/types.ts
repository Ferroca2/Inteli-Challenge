export interface Research {
    name: string;
    description: string;
    picture: string;
    file: string;
}

interface Category {
    id: number;
    name: string;
}

interface Coin {
    id: string;
    coingecko_id: string;
    name: string;
    rank: number;
    symbol: string;
}

export interface APIResponse {
    categories: Category[];
    coins: Coin[];
    created_date: string;
    date_event: string;
    id: number;
    proof: string;
    source: string;
    title: {
        en: string;
    };
}

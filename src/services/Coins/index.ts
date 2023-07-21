import { Coin } from './types';

export const GetCoins = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false',
      {
        next: {
          revalidate: 60,
        },
      }
    );
    
    const data: Coin[] = await response.json();
    return data;
  } catch {}
};

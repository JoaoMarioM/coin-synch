import { apiCoins } from '@/services/api';
import { VariationResponse } from './types';

export const GetCoins = async () => {
  try {
    const res = await apiCoins.get('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    return res.data;
  } catch (error) {
    throw error
  }
};

export const GetCoin = async (crypto: string) => {
  try {
    const res = await apiCoins.get(`/coins/${crypto}`)
    return res.data;
  } catch (error) {
    throw error
  }
};

export const GetVariation = async (crypto: string) => {
  try {
    const res = await apiCoins.get<VariationResponse>(`/coins/${crypto}/market_chart?vs_currency=usd&days=1`);
    return res.data;
  } catch (error) {
    throw error
  }
};

export const GetOptionsCoins = async () => {
  try {
    const res = await apiCoins.get(`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h&include_24hr_vol=true&include_24hr_change=true`);
    return res.data;
  } catch (error) {
    throw error
  }
}



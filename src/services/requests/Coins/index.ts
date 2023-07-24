import { apiCoins } from '@/services/api';

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
    const res = await apiCoins.get(`/coins/${crypto}/market_chart?vs_currency=usd&days=1`)
    return res.data;
  } catch (error) {
    throw error
  }
};


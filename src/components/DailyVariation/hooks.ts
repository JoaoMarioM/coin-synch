import { GetCoin, GetVariation } from '@/services/requests/Coins';
import { useEffect, useState } from 'react';
import { CoinVariation } from './types';

export const useDailyVariation = (crypto: string) => {
  const [coin, setCoin] = useState<CoinVariation>({
    image: '',
    symbol: '',
    data: [],
    isPositiveVariation: false,
    formattedVariation: '',
  });


  const numberFormatter = new Intl.NumberFormat('en-US', {
    signDisplay: 'exceptZero',
    maximumFractionDigits: 2,
  });

  const getCoin = async () => {
    try {
      const res = await GetCoin(crypto);
      const data = await GetVariation(crypto);
      
      const [[, firstPrice], ...middle] = data?.prices;
      const [[, lastPrice]] = middle.slice(-1);
      const dailyVariation = ((lastPrice - firstPrice) / firstPrice) * 100;

      setCoin({
        image: res?.image?.small,
        symbol: res?.symbol,
        data: data?.prices?.map(([, price]) => ({ price })),
        isPositiveVariation: dailyVariation >= 0,
        formattedVariation: `${numberFormatter.format(dailyVariation)}%`,
      })

    } catch (error) {
      
    }
  };

  useEffect(() => {
    getCoin()
  }, [])

  return {
    coin
  }
};

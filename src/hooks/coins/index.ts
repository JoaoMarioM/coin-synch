'use client';

import { useState, useEffect, useCallback } from 'react';
import { Coin } from '@/services/requests/Coins/types';
import { GetCoins } from '@/services/requests/Coins';

export const useCoins = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  const numberFormatter = new Intl.NumberFormat('en-US', {
    signDisplay: 'exceptZero',
    maximumFractionDigits: 2,
  });

  const getCoins = useCallback(async () => {
    try {
      const res = await GetCoins();

      const formattedCoins = res?.map((coin: Coin) => ({
        ...coin,
        symbol: coin.symbol.toLocaleUpperCase(),
        percentage_24h: `${numberFormatter.format(
          coin.market_cap_change_percentage_24h
        )}%`,
        price: coin.current_price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        }),
      }));

      setCoins(formattedCoins as Coin[]);
    } catch (error) {}
  }, []);

    useEffect(() => {
      getCoins();
    }, []);

  return {
    coins,
    getCoins
  };
};

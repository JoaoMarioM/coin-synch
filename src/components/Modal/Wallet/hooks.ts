import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { CoinOption, wallet } from '@/stores/wallet';
import { FormData, SelectOptionCoin } from './types';
import { Coin } from '@/services/requests/Coins/types';
import { useEffect } from 'react';
import { GetOptionsCoins } from '@/services/requests/Coins';


export const schema = yup
  .object({
    quantity: yup
      .number()
      .typeError('Quantity is required!')
      .moreThan(0, 'You must add some quantity')
      .required('Quantity is required!'),
    option: yup.object().required('Select a crypto to add'),
  })
  .required();

export const useWallet = ({setIsOpen}: {setIsOpen: (value: boolean) => void}) => {
  const numberFormatter = new Intl.NumberFormat('en-US', {
    signDisplay: 'exceptZero',
    maximumFractionDigits: 2,
  });

  const [options, setOption] = wallet((state) => [
    state.options,
    state.setOption,
  ]);
  const addCrypto = wallet((state) => state.addCrypto);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: FormData) => {
    addCrypto({
      ...(data.option as CoinOption).data,
      quantity: data.quantity,
    });

    reset();
    setIsOpen(false);
  };

  const getOptionsCoins = async () => {
    try {
      const data = await GetOptionsCoins();

      const options = data?.map((coin: Coin) => ({
        data: {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image: coin.image,
          change: coin.market_cap_change_percentage_24h,
          formattedChange: `${numberFormatter.format(
            coin.market_cap_change_percentage_24h
          )}%`,
          priceInUSD: coin.current_price,
        },
        label: '',
        value: coin.id,
      }));
      setOption(options);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getOptionsCoins();
  }, []);

  return {
    reset,
    errors,
    options,
    isValid,
    register,
    setValue,
    onSubmit,
    handleSubmit,
    isSubmitting,
  }
};

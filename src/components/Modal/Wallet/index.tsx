'use client';

import { useEffect } from 'react';

import * as yup from 'yup';
import Image from 'next/image';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import Button from '../../Button';
import Input from '../../Form/Input';
import Modal from '../../Modal';

import { yupResolver } from '@hookform/resolvers/yup';
import { CoinOption, wallet } from '@/stores/wallet';
import { SelectOptionCoin } from './types';
import { Coin } from '@/services/requests/Coins/types';

const numberFormatter = new Intl.NumberFormat('en-US', {
  signDisplay: 'exceptZero',
  maximumFractionDigits: 2,
});

const formatOptionLabel = ({ data }: SelectOptionCoin) => (
  <div className='flex gap-2 items-center'>
    <Image width={16} height={16} src={data?.image!} alt={data?.symbol!} />
    <p className='label'>
      {data?.name}{' '}
      <span className='text-secondary-500'>
        {data?.symbol?.toLocaleUpperCase()}
      </span>
    </p>
  </div>
);

const schema = yup
  .object({
    quantity: yup
      .number()
      .typeError('Quantity is required!')
      .moreThan(0, 'You must add some quantity')
      .required('Quantity is required!'),
    option: yup.object().required('Select a crypto to add'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export const WalletModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen(v: boolean): void;
}) => {
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

  useEffect(() => {
    async function fetchOptions() {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h&include_24hr_vol=true&include_24hr_change=true'
      );
      const data = await response.json();
      const options = data.map((coin: Coin) => ({
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
    }
    fetchOptions();
  }, [setOption]);

  return (
    <Modal
      header={<h4 className='xl:h4 md:h5 sm:p !font-bold'>Add Crypto</h4>}
      isOpen={isOpen}
      onDismiss={() => {
        reset();
        setIsOpen(false);
      }}
    >
      <Select
        formatOptionLabel={formatOptionLabel}
        options={options}
        placeholder='Choose crypto'
        classNames={{
          control: () =>
            'h-12 hover:!border-primary-500 !border-secondary-300 !shadow-none hover:!shadow-select',
          indicatorSeparator: () => 'hidden',
        }}
        onChange={(newValue) =>
          setValue('option', newValue!, { shouldValidate: true })
        }
      />

      <Input
        {...register('quantity')}
        variant='sm'
        type='number'
        className='mt-6 input-number_hidden'
        min={1}
        errorText={errors?.quantity?.message}
      />
      <Button
        disabled={!isValid}
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        className='mt-2 w-full'
      >
        Add crypto
      </Button>
    </Modal>
  );
};

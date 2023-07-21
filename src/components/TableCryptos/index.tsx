'use client';

import { cx } from 'class-variance-authority';
import { useMemo, useState } from 'react';
import Button from '../Button';
import Image from 'next/image';
import { useCoins } from '@/hooks/coins';

export const TableCryptos = () => {
  const {coins} = useCoins()
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const coinsToRender = useMemo(
    () => coins?.slice(0, isExpanded ? 10 : 5),
    [coins, isExpanded]
  );

  return (
    <div className='col-span-full'>
      <div>
        <div className='grid sm:grid-cols-[1fr_76px] md:grid-cols-[calc(10%_-_10px)_calc(35%_-_10px)_calc(25%_-_10px)_calc(20%_-_10px)_10%] col-span-full px-4'>
          <div className='label font-normal text-left'>#</div>
          <div className='label sm:hidden md:block font-normal text-left'>
            Crypto
          </div>
          <div className='label sm:hidden md:block font-normal text-left'>
            Price
          </div>
          <div className='label sm:hidden md:block font-normal text-left'>
            Change
          </div>
          <div className='label font-normal text-left'>Actions</div>
        </div>

        {coinsToRender?.map((coin, index) => (
          <div
            key={coin.id}
            className='grid sm:grid-cols-[1fr_76px] md:grid-cols-[calc(10%_-_10px)_calc(35%_-_10px)_calc(25%_-_10px)_calc(20%_-_10px)_10%] col-span-full p-4 even:bg-white odd:bg-secondary-100'
          >
            <div className='sm:hidden md:flex items-center text-base leading-6 tracking-normal text-default'>
              {index + 1}
            </div>
            <div className='flex items-center text-base leading-6 tracking-normal text-default'>
              <div className='flex gap-4 items-center'>
                <Image
                  width={24}
                  height={24}
                  src={coin.image}
                  alt={coin.symbol}
                  className='!w-6 !h-6'
                />
                <p>
                  {coin.name}{' '}
                  <span className='text-secondary-500'>{coin.symbol}</span>
                </p>
              </div>
            </div>
            <div className='sm:hidden md:flex items-center text-base leading-6 tracking-normal text-default'>
              {coin.price}
            </div>
            <div
              className={cx(
                'sm:hidden md:flex items-center text-base leading-6 tracking-normal text-default',
                coin.market_cap_change_percentage_24h >= 0
                  ? 'text-tertiary-700'
                  : 'text-quartenary-500'
              )}
            >
              {coin.percentage_24h}
            </div>
            <div className='flex items-center'>
              <Button className='sm:hidden md:flex' intent='tertiary' size='sm'>
                Buy
              </Button>
              <Button
                onClick={() => {
                  const newArray = expandedRows.includes(index)
                    ? expandedRows.filter((n) => n !== index)
                    : [...expandedRows, index];
                  setExpandedRows(newArray);
                }}
                className={cx(
                  'sm:flex md:hidden !p-0 ml-auto',
                  expandedRows.includes(index) ? 'rotate-180' : 'rotate-0'
                )}
                suffix='arrow-down'
                variant='text'
                intent='primary'
                size='sm'
              />
            </div>

            <div
              className={cx(
                'sm:flex md:hidden col-span-full gap-4 flex-col border-t border-secondary-200',
                'transition-expand overflow-hidden',
                expandedRows.includes(index)
                  ? 'h-20 mt-4 pt-4'
                  : 'h-0 m-0 p-0 border-t-0'
              )}
            >
              <div className='flex justify-between'>
                <p>Price</p>
                <span>{coin.price}</span>
              </div>
              <div className='flex justify-between'>
                <p>Change</p>
                <span
                  className={
                    coin.market_cap_change_percentage_24h >= 0
                      ? 'text-tertiary-700'
                      : 'text-quartenary-500'
                  }
                >
                  {coin.percentage_24h}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant='text'
        className='mx-auto sm:col-span-4 md:col-span-2 xl:col-start-6 sm:col-start-1 md:col-start-4'
        suffix={isExpanded ? 'minus' : 'plus'}
        onClick={() => setIsExpanded((p) => !p)}
      >
        {isExpanded ? 'View less' : 'View more'}
      </Button>
    </div>
  );
};

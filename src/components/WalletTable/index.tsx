'use client';

import Image from 'next/image';
import { cx } from 'class-variance-authority';

import { Icon } from '../Icon';
import Button from '../Button';
import TransferModal from '../Modal/TransferModal';
import { WalletModal } from '../Modal/Wallet';

import { useWalletTable } from './hooks';

function WalletTable() {
  const {
    owned,
    isOpen,
    isMobile,
    setIsOpen,
    selectedCrypto,
    setSelectedCrypto,
  } = useWalletTable()

  return (
    <div className='p-6 rounded-xl shadow-card bg-white max-md:bg-transparent max-md:shadow-none'>
      <header className='border-b border-secondary-200 flex gap-4 pb-6'>
        <Icon name='wallet' className='md:w-8 md:h-8 sm:w-6 sm:h-6' />
        <h4 className='md:h4 sm:h5 !font-bold'>My Wallet</h4>

        <Button
          size='sm'
          prefix='plus'
          className='ml-auto max-md:p-[6px]'
          iconClassname='invert brightness-0 w-3 h-3'
          onClick={() => setIsOpen(true)}
        >
          <span className='max-md:hidden'>Add crypto</span>
        </Button>
      </header>

      <div className='flex items-center justify-center'>
        {!owned.length && (
          <div className='my-20 gap-2 flex flex-col items-center justify-center'>
            <Image
              src='/empty-wallet.svg'
              alt='empty-wallet'
              width={0}
              height={0}
              className='md:w-[82px] md:h-[68px] sm:w-[58px] sm:h-[48px]'
            />
            <h5 className='md:h5 sm:p !font-bold'>Nothing here yet...</h5>
            <p className='md:label sm:small-label'>
              Add a crypto and start earning
            </p>
          </div>
        )}

        {!!owned.length && (
          <>
            {!isMobile && (
              <div className='flex-1 mt-6'>
                <div className='grid sm:grid-cols-[1fr_76px] md:grid-cols-[calc(12.5%_-_10px)_calc(25%_-_10px)_calc(25%_-_10px)_calc(25%_-_10px)_12.5%] col-span-full px-4'>
                  <div className='label font-normal text-left'>#</div>
                  <div className='label sm:hidden md:block font-normal text-left'>
                    Crypto
                  </div>
                  <div className='label sm:hidden md:block font-normal text-left'>
                    Holdings
                  </div>
                  <div className='label sm:hidden md:block font-normal text-left'>
                    Change
                  </div>
                  <div className='label font-normal text-right'>Trade</div>
                </div>

                {owned.map((coin, index) => (
                  <div
                    key={coin.id}
                    className='grid sm:grid-cols-[1fr_76px] md:grid-cols-[calc(12.5%_-_10px)_calc(25%_-_10px)_calc(25%_-_10px)_calc(25%_-_10px)_12.5%] col-span-full p-4 even:bg-white odd:bg-secondary-100'
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
                          <span className='text-secondary-500'>
                            {coin.symbol.toLocaleUpperCase()}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className='sm:hidden md:flex items-center text-base leading-6 tracking-normal text-default'>
                      <div>
                        <p className='label'>
                          {coin.quantity.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <p className='small-label !text-primary-500'>
                          {(coin.quantity / coin.priceInUSD).toFixed(4)}{' '}
                          {coin.symbol.toLocaleUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div
                      className={cx(
                        'sm:hidden md:flex items-center text-base leading-6 tracking-normal text-default',
                        coin.change >= 0
                          ? 'text-tertiary-700'
                          : 'text-quartenary-500'
                      )}
                    >
                      {coin.formattedChange}
                    </div>
                    <div className='flex items-center justify-end'>
                      <Button
                        onClick={() => setSelectedCrypto(coin)}
                        className='flex !p-2'
                        variant='text'
                        suffix='exchange'
                        size='sm'
                        iconClassname='w-6 h-6'
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isMobile && (
              <div className='w-full grid grid-cols-4 gap-4 mt-6'>
                {owned.map((coin) => (
                  <div
                    key={coin.id}
                    className='col-span-2 rounded-md overflow-hidden shadow-card'
                  >
                    <div className='py-4 px-2 bg-primary-100 flex justify-center items-center'>
                      <div className='flex gap-1 items-center'>
                        <Image
                          width={0}
                          height={0}
                          src={coin.image}
                          alt={coin.symbol}
                          className='!w-4 !h-4'
                        />
                        <p className='small-label'>
                          {coin.name}{' '}
                          <span className='text-secondary-500'>
                            {coin.symbol.toLocaleUpperCase()}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className='p-4 flex flex-col gap-1 border-b border-secondary-200'>
                      <p className='small-label !text-secondary-500'>
                        Holdings
                      </p>

                      <p className='label'>
                        {coin.quantity.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 2,
                        })}
                      </p>

                      <p className='small-label !text-primary-500'>
                        {(coin.quantity / coin.priceInUSD).toFixed(4)}{' '}
                        {coin.symbol.toLocaleUpperCase()}
                      </p>
                    </div>

                    <div className='p-4 flex flex-col gap-1'>
                      <p className='small-label !text-secondary-500'>Change</p>

                      <p
                        className={cx(
                          'label',
                          coin.change >= 0
                            ? 'text-tertiary-700'
                            : 'text-quartenary-500'
                        )}
                      >
                        {coin.formattedChange}
                      </p>
                    </div>

                    <div className='pb-4 px-4 flex flex-col gap-1'>
                      <Button
                        size='sm'
                        className='w-full !py-1'
                        onClick={() => setSelectedCrypto(coin)}
                      >
                        Trade
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <WalletModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <TransferModal
        coin={selectedCrypto}
        isOpen={!!selectedCrypto}
        setIsOpen={() => setSelectedCrypto(null)}
      />
    </div>
  );
}

export default WalletTable;

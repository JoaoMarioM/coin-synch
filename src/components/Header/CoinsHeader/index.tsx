import { useCoins } from '@/hooks/coins';
import { Coin } from '@/services/requests/Coins/types';

export const CoinsHeader = () => {
  const { coins } = useCoins();
  
  function RenderItem({ coin }: { coin: Coin }) {
    return (
      <div className='!label flex gap-2'>
        <span className='text-secondary-800'>{coin.symbol}</span>
        <span className='text-default'>{coin.price}</span>
        <span
          className={
            coin.market_cap_change_percentage_24h >= 0
              ? 'text-tertiary-500'
              : 'text-quartenary-500'
          }
        >
          {coin.percentage_24h}
        </span>
      </div>
    );
  }
  
  return (
    <div className='h-full max-w-sm w-full overflow-hidden flex items-center justify-center'>
      <div className='flex gap-6'>
        <div className='flex justify-around items-center gap-6 animate-scrolling'>
          {coins?.map((coin) => (
            <RenderItem key={coin.id} coin={coin} />
          ))}
        </div>
        <div className='flex justify-around items-center gap-6 animate-scrolling'>
          {coins?.map((coin) => (
            <RenderItem key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    </div>
  );
}

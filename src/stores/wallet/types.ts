import { SelectOption } from '@/components/Modal/Wallet/types';
import { Coin } from '@/services/requests/Coins/types';

export type OwnedCoin = {
  quantity: number;
  change: number;
  formattedChange: string;
  priceInUSD: number;
  id:string;
  symbol: string;
  name:string;
  image: string;
} &  Coin;

export type CoinOption = {
  data: Omit<OwnedCoin, "quantity">;
} & SelectOption;

export type WalletState = {
  balance: number;
  options: CoinOption[];
  owned: Array<OwnedCoin>;
  setOption(options: CoinOption[]): void;
  addCrypto(crypto: OwnedCoin): void;
  transferInQuantity(id: string, quantity: number): void;
  transferOutQuantity(id: string, quantity: number): void;
}
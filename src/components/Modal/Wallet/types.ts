import { Coin } from '@/services/requests/Coins/types';

type SelectOption = {
  label: string
  value: string
}

export type SelectOptionCoin = {
  value: string;
  label: string;
  data: Partial<Coin>;
} & SelectOption;
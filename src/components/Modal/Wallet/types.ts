import * as yup from 'yup';

import { Coin } from '@/services/requests/Coins/types';
import { schema } from './hooks';

export type SelectOption = {
  label: string
  value: string
}

export type SelectOptionCoin = {
  value: string;
  label: string;
  data: Partial<Coin>;
} & SelectOption;

export type FormData = yup.InferType<typeof schema>;

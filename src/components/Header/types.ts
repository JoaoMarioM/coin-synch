import { Coin } from '@/services/requests/Coins/types';

export type HeaderProps = {
  hideShadow?: boolean;
  handleModalSignin: (value: boolean) => void;
  handleModalSignup: (value: boolean) => void;
}
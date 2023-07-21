import { Coin } from '@/services/Coins/types';

export type HeaderProps = {
  hideShadow?: boolean;
  handleModalSignin: (value: boolean) => void;
  handleModalSignup: (value: boolean) => void;
}
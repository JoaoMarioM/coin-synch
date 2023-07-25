import { OwnedCoin } from "@/stores/wallet"

export type TransferModalProps = {
  coin: OwnedCoin | null;
  isOpen: boolean;
  setIsOpen(v: boolean): void
};

export type UseTransferModalProps = {
  coin: OwnedCoin | null;
  setIsOpen(v: boolean): void
}
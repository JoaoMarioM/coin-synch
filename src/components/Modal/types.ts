import { ComponentProps } from 'react';

export type ModalProps = {
  isOpen?: boolean;
  header: React.ReactNode;
  onDismiss: (value: boolean) => void;
} & ComponentProps<"div">
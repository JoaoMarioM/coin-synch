import { ComponentProps } from 'react';

export type Props = {
  iconName?: string;
  title: string;
  subtitle: string;
  text: string;
} & ComponentProps<'div'>
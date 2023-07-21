import { ImageProps } from 'next/image';

export type Props =  {
  name: string;
} & Omit<ImageProps, "src" | "alt" | "width" | "height">
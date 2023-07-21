import Image, { ImageProps } from 'next/image';

import { Props } from './types';

export const Icon = ({ name, ...props }: Props) => {
  return (
    <Image
      width={0}
      height={0}
      src={`/icons/${name}.svg`}
      alt={name}
      {...props}
    />
  );
};

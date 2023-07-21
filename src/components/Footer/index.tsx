import Image from 'next/image';
import { cx } from 'class-variance-authority';
import { Props } from './types';

export function Footer({ hideLogo = false }: Props) {
  return (
    <footer className='shadow-top h-16'>
      <div
        className={cx(
          'transition-[max-width] ease-out h-full container flex max-md:justify-center items-center gap-6 max-sm:px-6',
          hideLogo ? 'justify-center' : 'justify-between'
        )}
      >
        <p
          className={cx(hideLogo ? 'md:label sm:small-label' : 'max-md:hidden')}
        >
          Copyright © 2022 - All rights reserved
        </p>
        {!hideLogo && (
          <Image
            src='/logo.svg'
            alt='CoinSynch logo'
            width={95}
            height={16}
            priority
          />
        )}
      </div>
    </footer>
  );
}

'use client';

import { cx } from 'class-variance-authority';
import Image from 'next/image';
import Button from '../Button';
import Link from 'next/link';
// import { TopCoinsCarousel } from './TopCoinsCarousel'
// import { useSession } from 'next-auth/react'
import { CoinsHeader } from './CoinsHeader';
import { HeaderProps } from './types';

function Header({ 
  hideShadow = false,
  handleModalSignin,
  handleModalSignup
}: HeaderProps) {
  // const session = useSession()

  return (
    <header
      className={cx(
        'h-16 sticky top-0 bg-white z-20',
        !hideShadow ? 'shadow' : ''
      )}
    >
      <div className='transition-[max-width] ease-out h-full container flex items-center gap-6 max-sm:px-6'>
        <Image
          src='/logo.svg'
          alt='CoinSynch logo'
          width={124}
          height={21}
          priority
          className='mr-4'
        />

        <nav className='flex-1 items-center flex gap-6'>
          <Link className='max-md:hidden label' href='#about'>
            About us
          </Link>
          <Link className='max-md:hidden label mr-auto' href='#top-cryptos'>
            Top Cryptos
          </Link>
          <div 
            className='xl:mr-14 xl:static max-xl:bg-white max-xl:absolute max-xl:top-16 max-xl:left-0 max-xl:right-0 max-xl:w-full max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-9 max-xl:border-b max-xl:border-t max-xl:border-secondary-200'
          >
            <CoinsHeader />
          </div>

          <button className="max-md:hidden label" onClick={() => handleModalSignin(true)}>Sign in</button>
          <Button size="sm" className='max-md:hidden' onClick={() => handleModalSignup(true)}>Sign up</Button>
          {/* {session.status === "authenticated" ? (
                        <Button size="sm" href="/dashboard" className='max-md:hidden'>Enter dashboard</Button>
                    ) : (
                        <>
                            <Link className="max-md:hidden label" href="/signin">Sign in</Link>
                            <Button size="sm" href="/signup" className='max-md:hidden'>Sign up</Button>
                        </>
                    )} */}
        </nav>
        <Link href='#' className='md:hidden ml-auto'>
          <Image src='/icons/h-menu.svg' alt='menu' width={24} height={24} />
        </Link>
      </div>
    </header>
  );
}
export default Header;

'use client';

import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { Item } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';

import DropdownMenu from '../DropdownMenu';
import { Icon } from '../Icon';
import { sideMenu } from '@/stores/sideMenu';
import Button from '../Button';
import { DashboardHeaderProps } from './types';

function DashboardHeader({ hideShadow = false, user }: DashboardHeaderProps) {
  const router = useRouter();

  const toggleMenu = sideMenu((store) => store.toggleMenu);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    router.push('/');
  }

  return (
    <header
      className={cx(
        'h-16 sticky top-0 bg-white z-20',
        !hideShadow ? 'shadow' : ''
      )}
    >
      <div className='transition-[max-width] ease-out h-full container flex items-center gap-6 max-sm:px-6 justify-between'>
        <Button
          className='xl:hidden !p-2 rounded-full hover:cursor-pointer'
          suffix='h-menu'
          variant='text'
          iconClassname='w-6 h-6'
          onClick={toggleMenu}
        />
        <Image
          src='/logo.svg'
          alt='CoinSynch logo'
          width={0}
          height={0}
          priority
          className='mr-4 md:w-32 md:h-5 sm:h-4 sm:w-24  hover:cursor-pointer'
        />
        <DropdownMenu
          options={
            <Item
              onClick={handleLogout}
              className='text-secondary-500 group rounded flex items-center gap-4 px-2 outline-primary-500 hover:bg-primary-500 hover:text-white hover:cursor-pointer'
            >
              <Icon
                name='door-out'
                className='w-4 h-4 group-hover:invert group-hover:brightness-0 '
              />{' '}
              Logout
            </Item>
          }
        >
          <div className='flex items-center gap-2 cursor-default select-none'>
            <div className='w-8 h-8 border border-secondary-300 rounded-full overflow-hidden'>
              <Image
                src='/images/imageHeader.png'
                alt=''
                width={32}
                height={32}
                className='object-cover object-center'
              />
            </div>

            <span className='max-md:hidden'>{user?.name}</span>

            <Icon name='arrow-up' className='w-2 h-2' />
          </div>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default DashboardHeader;

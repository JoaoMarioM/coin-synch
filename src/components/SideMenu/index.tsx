'use client';

import { cx } from 'class-variance-authority';
import Button from '../Button';
import Tooltip from '../Tooltip';
import { sideMenu } from '@/stores/sideMenu';

function SideMenu() {
  const [isOpen, toggleMenu] = sideMenu((store) => [
    store.isOpen,
    store.toggleMenu,
  ]);

  return (
    <aside
      className={cx(
        'border-y border-secondary-300 z-10',
        'xl:static sm:absolute xl:h-[unset] sm:h-[calc(100%_-_64px)] transition-transform',
        isOpen ? 'translate-x-0' : '-translate-x-60',
        'xl:!translate-x-0'
      )}
    >
      <nav className='max-xl:w-60 h-full py-12 max-xl:px-6 w-20 bg-white flex flex-col gap-4'>
        <Tooltip label='Lorem ipsum' sideOffset={0} side='left'>
          <div className='flex items-center xl:justify-center justify-start gap-4'>
            <Button
              variant='text'
              suffix='wallet'
              iconClassname='w-8 h-8'
              className='!p-2 xl:rounded-[50%] rounded-xl xl:w-auto w-full !justify-end flex-row-reverse'
            >
              <span className='label xl:hidden'>Lorem ipsum</span>
            </Button>
          </div>
        </Tooltip>
        <Tooltip label='Lorem ipsum' sideOffset={0} side='left'>
          <div className='flex items-center xl:justify-center justify-start gap-4'>
            <Button
              variant='text'
              suffix='crypto'
              iconClassname='w-8 h-8'
              className='!p-2 xl:rounded-[50%] rounded-xl xl:w-auto w-full !justify-end flex-row-reverse'
            >
              <span className='label xl:hidden'>Lorem ipsum</span>
            </Button>
          </div>
        </Tooltip>
        <Tooltip label='Lorem ipsum' sideOffset={0} side='left'>
          <div className='flex items-center xl:justify-center justify-start gap-4'>
            <Button
              variant='text'
              suffix='bitcoin'
              iconClassname='w-8 h-8'
              className='!p-2 xl:rounded-[50%] rounded-xl xl:w-auto w-full !justify-end flex-row-reverse'
            >
              <span className='label xl:hidden'>Lorem ipsum</span>
            </Button>
          </div>
        </Tooltip>
        <Tooltip label='Lorem ipsum' sideOffset={0} side='left'>
          <div className='flex items-center xl:justify-center justify-start gap-4'>
            <Button
              variant='text'
              suffix='increase-chart'
              iconClassname='w-8 h-8'
              className='!p-2 xl:rounded-[50%] rounded-xl xl:w-auto w-full !justify-end flex-row-reverse'
            >
              <span className='label xl:hidden'>Lorem ipsum</span>
            </Button>
          </div>
        </Tooltip>

        <Button
          onClick={() => toggleMenu()}
          variant='text'
          suffix='arrow-back'
          iconClassname='w-8 h-8'
          className='!p-2 rounded-[50%] mt-20 mr-auto xl:hidden'
        />
      </nav>
    </aside>
  );
}

export default SideMenu;

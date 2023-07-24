'use client';

import { ComponentProps, forwardRef, useMemo, useState } from 'react';

interface Props extends Omit<ComponentProps<'input'>, 'type'> {
  label?: React.ReactNode;
  errorText?: string;
}

// eslint-disable-next-line react/display-name
const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, prefix, errorText, id = 'checkbox', className, ...props }, ref) => {
    return (
      <div>
        <div className='flex items-start gap-4'>
          <input
            ref={ref}
            className='w-6 h-6 rounded accent-primary-500 outline-primary-500 border-primary-500 border-2'
            type='checkbox'
            id={id}
            {...props}
          />
          <label htmlFor={id}>{label}</label>
        </div>

        <div className='h-6 flex items-end'>
          {!!errorText && (
            <p className='small-label text-quartenary-500 mt-1 mb-auto'>
              {errorText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Checkbox;

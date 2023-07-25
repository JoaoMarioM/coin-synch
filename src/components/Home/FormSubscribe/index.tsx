'use client';

import { useCallback, useState } from 'react';
import { cx } from 'class-variance-authority';
import Image from 'next/image';

import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import { Container } from '@/components/Container';

export const FormSubscribe = () => {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setIsSubmitting(false);
    setValue('');
  }, []);

  return (
    <div className='bg-lg-primary relative sm:py-6 md:py-32'>
      <Container className='relative z-10 sm:gap-10'>
        <div className='col-span-4 xl:col-start-2'>
          <h4 className='sm:p md:h4 !font-bold !text-primary-200 mb-1'>
            Lorem ipsum
          </h4>
          <h2 className='sm:h4 md:h2 !font-bold !text-white'>Lorem ipsum</h2>
          <p className='sm:label md:p mt-4 !text-white'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>
        </div>
        <div className='col-span-4 xl:col-end-12'>
          <fieldset className={cx('flex flex-col')}>
            <legend className={cx('label mb-2 text-white')}>Email</legend>
            <Input
              value={value}
              placeholder='Email'
              disabled={isSubmitting}
              onChange={(event: any) => setValue(event?.target?.value)}
            />
          </fieldset>

          <Button
            isLoading={isSubmitting}
            className='w-full'
            onClick={handleSubmit}
          >
            Subscribe
          </Button>
        </div>
      </Container>
      <Image
        src='/wavesForm.svg'
        alt='waves'
        fill
        className='object-cover object-center z-0'
      />
    </div>
  );
};

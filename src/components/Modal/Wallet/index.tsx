'use client';

import Image from 'next/image';
import Select from 'react-select';

import Button from '../../Button';
import Input from '../../Form/Input';
import Modal from '../../Modal';

import { SelectOptionCoin } from './types';
import { useWallet } from './hooks';

export const WalletModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen(v: boolean): void;
}) => {
  const {
    reset,
    errors,
    options,
    isValid,
    register,
    setValue,
    onSubmit,
    handleSubmit,
    isSubmitting,
  } = useWallet({ setIsOpen });

  const formatOptionLabel = ({ data }: SelectOptionCoin) => (
    <div className='flex gap-2 items-center'>
      <Image width={16} height={16} src={data?.image!} alt={data?.symbol!} />
      <p className='label'>
        {data?.name}{' '}
        <span className='text-secondary-500'>
          {data?.symbol?.toLocaleUpperCase()}
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      header={<h4 className='xl:h4 md:h5 sm:p !font-bold'>Add Crypto</h4>}
      isOpen={isOpen}
      onDismiss={() => {
        reset();
        setIsOpen(false);
      }}
    >
      <Select
        formatOptionLabel={formatOptionLabel}
        options={options}
        placeholder='Choose crypto'
        classNames={{
          control: () =>
            'h-12 hover:!border-primary-500 !border-secondary-300 !shadow-none hover:!shadow-select',
          indicatorSeparator: () => 'hidden',
        }}
        onChange={(newValue) =>
          setValue('option', newValue!, { shouldValidate: true })
        }
      />

      <Input
        {...register('quantity')}
        variant='sm'
        type='number'
        className='mt-6 input-number_hidden'
        min={1}
        errorText={errors?.quantity?.message}
      />
      <Button
        disabled={!isValid}
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        className='mt-2 w-full'
      >
        Add crypto
      </Button>
    </Modal>
  );
};

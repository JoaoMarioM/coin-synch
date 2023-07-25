'use client';

import Image from 'next/image';
import Button from '../../Button';
import Input from '../../Form/Input';
import Modal from '../../Modal';
import Select from 'react-select';
import { TransferModalProps } from './types';
import { TRANSFER_OPTIONS, useTransferModal } from './hooks';

const TransferModal = ({ isOpen, setIsOpen, coin }: TransferModalProps) => {
  const {
    reset,
    onSubmit,
    register,
    setValue,
    handleSubmit,
    errors,
    isValid,
    isSubmitting,
  } = useTransferModal({ coin, setIsOpen });

  if (!coin) return <></>;

  return (
    <Modal
      header={<h4 className='xl:h4 md:h5 sm:p !font-bold'>Tansfer Crypto</h4>}
      isOpen={isOpen}
      onDismiss={() => {
        reset();
        setIsOpen(false);
      }}
    >
      <div className='flex gap-6 items-center justify-center mb-7 pt-7 border-t border-secondary-200'>
        <p className='label text-secondary-400'>You are transfering</p>
        <div className='flex gap-1 items-center'>
          <Image width={24} height={24} src={coin.image} alt={coin.symbol} />
          <p>
            {coin.name}{' '}
            <span className='text-secondary-500'>
              {coin.symbol.toLocaleUpperCase()}
            </span>
          </p>
        </div>
      </div>

      <Select
        options={TRANSFER_OPTIONS}
        placeholder='Select transfer'
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
        Transfer Crypto
      </Button>
    </Modal>
  );
};

export default TransferModal;

'use client';

import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { SignupProps } from '../Signup/types';
import { GetUsers } from '@/services/requests/user';
import { FormProps } from '@/services/requests/user/types';
import { useSignin } from './hooks';



const SignInModal = ({ handleSignin }: SignupProps) => {
  const {
    error,
    errors,
    isValid,
    onSubmit,
    register,
    isSubmitting,
    handleSubmit,
  } = useSignin();

  return (
    <form className='flex flex-col'>
      <Input
        {...register('email')}
        placeholder='Email'
        prefix='email'
        variant='sm'
        errorText={errors.email?.message || error}
      />
      <Input
        {...register('password')}
        placeholder='Password'
        prefix='lock'
        variant='sm'
        type='password'
        errorText={errors.password?.message}
      />

      <div className='relative'>
        <p className='small-label absolute right-0 -top-4'>Forgot password?</p>

        <Button
          disabled={!isValid}
          isLoading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          type='submit'
          className='w-full mt-5'
        >
          Sign in
        </Button>
      </div>

      <button 
        onClick={() => handleSignin('sinup')}
        className='sm:small-label xl:label mx-auto mt-6'
      >
        Don’t have an account? <span className='font-bold'>Sign up to</span>{' '}
        <span className='text-primary-500 font-bold'>Coin</span>
        <span className='text-secondary-500 font-bold'>Synch</span>
      </button>
    </form>
  );
};

export default SignInModal;

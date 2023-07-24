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

const schema = yup
  .object({
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignInModal = ({ handleSignin }: SignupProps) => {
  const router = useRouter();

  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      const res: FormProps[] = await GetUsers()

      const findUser = res.find(item => item.email === data.email);

      if(!findUser){
        setError('username or password not found');
        return;
      }

      if(findUser && findUser.password !== data.password){
        setError('username or password not found');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      router.push('/dashboard');
    } catch (error) {
      
    }
  };

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

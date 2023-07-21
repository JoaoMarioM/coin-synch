'use client';

import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import Modal from '@/components/Modal';
// import { signIn } from "next-auth/react";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
// import { userDbStore } from "@/stores/usersDb";

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

const SignInModal = () => {
  const [error, setError] = useState('');
  // const users = userDbStore(store => store.users)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: FormData) => {
    // const user = users.find(user => user.email === data.email)

    // if (user && user.password === data.password) {
    //     await signIn("credentials", {
    //         redirect: true,
    //         callbackUrl: "/dashboard",
    //         ...user,
    //     })
    //     return
    // }

    setError('User not found!');
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

      <Link href='/signup' className='sm:small-label xl:label mx-auto mt-6'>
        Don’t have an account? <span className='font-bold'>Sign up to</span>{' '}
        <span className='text-primary-500 font-bold'>Coin</span>
        <span className='text-secondary-500 font-bold'>Synch</span>
      </Link>
    </form>
  );
};

export default SignInModal;

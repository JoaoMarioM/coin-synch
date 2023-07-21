'use client';

import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Checkbox from '@/components/Form/Checkbox';
// import { userDbStore } from '@/stores/usersDb';

const schema = yup
  .object({
    name: yup.string().required('Name is required!'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .required('Email is required!'),
    password: yup.string().required('Password is required!'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords are not the same')
      .required('Confirm password is required!'),
    policyAccepted: yup.bool().oneOf([true], 'Accept the policy to proceed!'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SignUpModal = () => {
  const [error, setError] = useState('');
  // const addUser = userDbStore((store) => store.addUser);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      policyAccepted: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      addUser({
        email: data.email,
        name: data.name,
        password: data.password,
        image: '/menu-user.avif',
      });
      router.push('/signin');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <form className='flex flex-col'>
      <Input
        {...register('name')}
        placeholder='Name'
        prefix='user'
        variant='sm'
        errorText={errors.name?.message}
      />
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
      <Input
        {...register('confirmPassword')}
        placeholder='Confirm password'
        prefix='lock'
        variant='sm'
        type='password'
        errorText={errors.confirmPassword?.message}
      />
      <Checkbox
        {...register('policyAccepted')}
        errorText={errors.policyAccepted?.message}
        label={
          <p className='sm:small-label xl:label'>
            I have read and accept the{' '}
            <span className='font-bold'>Privacy Policy</span> and{' '}
            <span className='font-bold'>Terms of User Sign up.</span>
          </p>
        }
      />

      <Button
        disabled={!isValid}
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        type='submit'
        className='w-full'
      >
        Sign in
      </Button>

      <Link href='/signin' className='sm:small-label xl:label mx-auto mt-6'>
        Already have and account? <span className='font-bold'>Sign in to</span>{' '}
        <span className='text-primary-500 font-bold'>Coin</span>
        <span className='text-secondary-500 font-bold'>Synch</span>
      </Link>
    </form>
  );
};

export default SignUpModal;

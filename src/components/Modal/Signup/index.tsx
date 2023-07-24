'use client';

import Button from '@/components/Button';
import Input from '@/components/Form/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@/components/Form/Checkbox';
import { SignupProps } from './types';
import { useSignup } from './hooks';

const SignUpModal = ({ handleSignin }: SignupProps) => {
  const {
    error,
    errors,
    isValid,
    register,
    onSubmit,
    handleSubmit,
    isSubmitting,
  } = useSignup();

  return (
    <form className='flex flex-col'>
      <Input
        variant='sm'
        prefix='user'
        placeholder='Name'
        {...register('name')}
        errorText={errors.name?.message}
      />
      <Input
        variant='sm'
        prefix='email'
        placeholder='Email'
        {...register('email')}
        errorText={errors.email?.message || error}
      />
      <Input
        variant='sm'
        prefix='lock'
        type='password'
        placeholder='Password'
        {...register('password')}
        errorText={errors.password?.message}
      />
      <Input
        variant='sm'
        prefix='lock'
        type='password'
        placeholder='Confirm password'
        {...register('confirmPassword')}
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
        type='button'
        className='w-full'
        disabled={!isValid}
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        Sign up
      </Button>

      <button 
        onClick={() => handleSignin('signin')}
        className='sm:small-label xl:label mx-auto mt-6'
      >
        Already have and account? <span className='font-bold'>Sign in to</span>{' '}
        <span className='text-primary-500 font-bold'>Coin</span>
        <span className='text-secondary-500 font-bold'>Synch</span>
      </button>
    </form>
  );
};

export default SignUpModal;

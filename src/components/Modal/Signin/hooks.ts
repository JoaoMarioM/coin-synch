import { useState } from 'react';

import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { GetUsers } from '@/services/requests/user';
import { FormProps } from '@/services/requests/user/types';
import { FormData } from './types';

export const schema = yup.object({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required!'),
  password: yup.string().required('Password is required!'),
}).required();

export const useSignin = () => {
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

  return {
    error,
    errors,
    isValid,
    onSubmit,
    register,
    isSubmitting,
    handleSubmit,
  }
}
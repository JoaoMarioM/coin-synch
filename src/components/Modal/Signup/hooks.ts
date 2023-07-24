import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormProps } from '@/services/requests/user/types';
import { RegisterUser } from '@/services/requests/user';

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

export const useSignup = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      policyAccepted: false,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormProps) => {
    try {
      await RegisterUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/dashboard');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    error,
    errors,
    isValid,
    register,
    onSubmit,
    handleSubmit,
    isSubmitting,
  };
}
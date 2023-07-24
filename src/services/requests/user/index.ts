import { apiUrl } from '@/services/api'
import { FormProps } from './types'

export const RegisterUser = async (data: FormProps) => {
  try {
    const res = await apiUrl.post('users', data)
    return res;
  } catch (error) {
    throw error;
  }
};

export const GetUsers = async () => {
  try {
    const res = await apiUrl.get('users')
    return res.data;
  } catch (error) {
    throw error;
  }
};
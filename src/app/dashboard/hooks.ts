import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { wallet } from '@/stores/wallet';
import { UserProps } from '@/services/requests/user/types';

export const useDashboard = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserProps>({
    id: 0,
    name: '',
    email: '',
    password: '',
  });

  const balance = wallet((state) => state.balance);

  const formattedBalance = useMemo(
    () =>
      balance.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      }),
    [balance]
  );

  const getUser = () => {
    const _user = localStorage.getItem('user');

    console.log(32, _user)
    if(_user){
      setUser(JSON.parse(_user));
    } else {
      router.push('/');
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    formattedBalance
  };
}
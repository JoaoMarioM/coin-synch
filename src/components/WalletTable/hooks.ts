import { useEffect, useState } from 'react';

import { OwnedCoin, wallet } from '@/stores/wallet';

export const useWalletTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<OwnedCoin | null>(null);
  const owned = wallet((state) => state.owned);

  const [windowwidth, setWindowwidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowwidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    owned,
    isOpen,
    setIsOpen,
    selectedCrypto,
    setSelectedCrypto,
    isMobile: windowwidth <= 768,
  }
};

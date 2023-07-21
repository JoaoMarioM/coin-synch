import {useMemo, useState} from 'react'
import { cva } from 'class-variance-authority';

export const useInput = (type: string) => {
  const styles = cva(
    'rounded-md outline-primary-500 w-full border-secondary-300 border',
    {
      variants: {
        variant: {
          sm: 'py-3 px-4',
          md: 'p-4',
        },
        errored: {
          true: 'outline-quartenary-500 !border-quartenary-500',
        },
      },
      defaultVariants: {
        variant: 'md',
      },
    }
  );

  const [isShowingPass, setIsShowingPass] = useState(false);

  const inputType = useMemo(() => {
    if (type === 'password') {
      return isShowingPass ? 'text' : 'password';
    }

    return type;
  }, [type, isShowingPass]);

  return {
    styles,
    inputType,
    isShowingPass,
    setIsShowingPass
  };
};

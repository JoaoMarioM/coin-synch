import { cva } from 'class-variance-authority';

export const useButtom = () => {
  const styles = cva(
    'px-6 label flex items-center justify-center gap-2 transition-colors',
    {
      variants: {
        intent: {
          primary: '',
          tertiary: '',
        },
        size: {
          sm: 'py-2 label',
          md: 'py-[12px] text-base leading-6 tracking-normal',
        },
        variant: {
          text: 'bg-transparent',
          contained: 'text-white rounded-3xl',
        },
        disabled: {
          true: 'bg-secondary-500/50 hover:bg-secondary-500/50',
        },
        loading: {
          true: 'bg-secondary-500/50 hover:bg-secondary-500/50',
        },
      },
      compoundVariants: [
        {
          variant: 'text',
          intent: 'primary',
          class: 'text-primary-500 hover:bg-primary-100 rounded',
        },
        {
          variant: 'text',
          intent: 'tertiary',
          class: 'text-tertiary-700 hover:bg-tertiary-100 rounded',
        },
        {
          variant: 'contained',
          intent: 'primary',
          class: 'bg-primary-500 hover:bg-primary-600',
        },
        {
          variant: 'contained',
          intent: 'tertiary',
          class: 'bg-tertiary-700 hover:bg-tertiary-800',
        },
      ],
      defaultVariants: {
        variant: 'contained',
        intent: 'primary',
        size: 'md',
      },
    }
  );

  const iconStyles = cva('', {
    variants: {
      intent: {
        primary: '',
        tertiary: '',
      },
      variant: {
        text: '',
        contained: 'fill-white',
      },
    },
    compoundVariants: [
      { variant: 'text', intent: 'primary', class: 'fill-primary-500' },
      { variant: 'text', intent: 'tertiary', class: 'fill-tertiary-700' },
    ],
    defaultVariants: {
      variant: 'contained',
      intent: 'primary',
    },
  });

  
  return {
    styles,
    iconStyles
  }
}


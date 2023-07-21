import { ComponentProps } from 'react'

export type Props =  {
  label?: string;
  errorText?: string;
  prefix?: string;
  variant?: string;
} & ComponentProps<'input'>
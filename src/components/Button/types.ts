import { ComponentProps } from "react";
import { LinkProps } from "next/link";
import { VariantProps } from "class-variance-authority";
import { useButtom } from './hooks';


export type ButtonOrLinkProps = ComponentProps<'button'> & Partial<LinkProps>;

export type Props =  {
  prefix?: string;
  suffix?: string;
  iconClassname?: string;
  isLoading?: boolean;
  intent?: string,
  variant?: string,
  size?: string,
} & ButtonOrLinkProps & Omit<VariantProps<any>, "loading" | "disabled">;
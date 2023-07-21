'use client';

import { ComponentProps } from 'react';
import { cva, VariantProps, cx } from 'class-variance-authority';
import Link, { LinkProps } from 'next/link';
import { Icon } from '../Icon';
import { Props } from './types';
import { useButtom } from './hooks';

const Button = ({
  intent,
  variant,
  size,
  href,
  className,
  disabled,
  prefix,
  suffix,
  iconClassname = 'w-3 h-3',
  isLoading = false,
  children,
  ...props
}: Props) => {
  const {
    styles,
    iconStyles
  } = useButtom()

  const classes = styles({
    variant,
    intent,
    size,
    className,
    disabled,
    loading: isLoading,
  });

  const content = isLoading ? (
    <Icon
      className={cx(
        iconStyles({ intent, variant, className: iconClassname }),
        'animate-spin w-5 h-5'
      )}
      name='loading'
    />
  ) : (
    <>
      {!!prefix && (
        <Icon
          className={iconStyles({ intent, variant, className: iconClassname })}
          name={prefix}
        />
      )}
      {children}
      {!!suffix && (
        <Icon
          className={iconStyles({ intent, variant, className: iconClassname })}
          name={suffix}
        />
      )}
    </>
  );

  return !!href ? (
    <Link
      className={classes}
      href={href}
      {...(props as Omit<LinkProps, 'href'>)}
    >
      {content}
    </Link>
  ) : (
    <button disabled={disabled || isLoading} className={classes} {...props}>
      {content}
    </button>
  );
};

export default Button;

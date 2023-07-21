import { cx } from 'class-variance-authority';
import { Icon } from '../Icon';
import { Props } from './types';

export const Card =({
  iconName,
  title,
  subtitle,
  text,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cx(
        'p-6 flex flex-col gap-4 flex-shrink-0 bg-white rounded-md md:w-[280px] sm:w-[200px] h-[268px] shadow-fancy',
        className
      )}
      {...props}
    >
      {!!iconName && (
        <Icon name={iconName} className='fill-primary-500 w-16 h-16' />
      )}

      <div className='flex-1'>
        <p className='p sm:label !text-primary-500 !font-bold mb-1'>{title}</p>
        <h4 className='h4 sm:h5 !font-bold'>{subtitle}</h4>
        <p
          className={cx(
            'label mt-2',
            !!iconName ? 'line-clamp-3' : 'line-clamp-6'
          )}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

'use client';

import { ComponentProps, useCallback, useEffect, useRef } from 'react';
import { Container } from '../Container';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { ModalProps } from './types';
import { useModal } from './hooks';

const Modal = ({ isOpen, header, children, onDismiss }: ModalProps) => {
  const { onClick, overlayRef, handleClose, containerRef } = useModal({
    onDismiss,
  });

  if (!isOpen) return <></>;

  return (
    <div
      ref={overlayRef}
      onClick={onClick}
      className='w-full h-full fixed inset-0 bg-default/60 z-50 flex items-center justify-center'
    >
      <Container ref={containerRef}>
        <div className='col-span-4 rounded-lg bg-white p-4 xl:col-start-5 md:col-start-3'>
          <div className='relative flex items-center justify-center px-4 mb-6'>
            {header}
            <Button
              onClick={handleClose}
              suffix='close'
              variant='text'
              iconClassname='w-4 h-4'
              className='absolute top-0 right-0 !p-0'
            />
          </div>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default Modal;

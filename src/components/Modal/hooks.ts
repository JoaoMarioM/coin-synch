import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';

export const useModal = ({onDismiss}: {onDismiss: (value: boolean) => void}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    if (onDismiss) {
      onDismiss(false);
      return;
    }
  }, [onDismiss]);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (
        event.target === overlayRef.current ||
        event.target === containerRef.current
      )
        handleClose();
    },
    [handleClose, overlayRef, containerRef]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return {
    onClick,
    overlayRef, 
    handleClose,
    containerRef,
  };
};

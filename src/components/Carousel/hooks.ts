import {useCallback, useState, useRef, useMemo, useEffect} from 'react'
import { Items } from './types';
import { debounce } from '@/utils/debounce';

export const useCarousel = () => {
  const MIN_DELAY = 4;
  const MAX_DELAY = 6;
  const GAP_SIZE = 112;

  const CAROUSEL_SIZE = {
    width: 215,
    height: 280,
  };

  const itens: Items[] = [
    { image: '/woman.svg', icons: ['bitcoin', 'increase-chart'] },
    { image: '/man.svg', icons: ['laptop-mobile', 'crypto'] },
    { image: '/womanGray.svg', icons: ['bitcoin', 'increase-chart'] },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(
    () => itens.map((__, index) => (CAROUSEL_SIZE.width + GAP_SIZE) * index),
    []
  );

  const scrollNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itens.length);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const debouncedScrollNext = debounce(scrollNext, 200);

    const listener = (event: WheelEvent) => {
      event.preventDefault();
      debouncedScrollNext();
    };

    container?.addEventListener('wheel', listener);
    return () => container?.removeEventListener('wheel', listener);
  }, [scrollNext]);

  return {
    containerRef,
    currentIndex,
    itens,
    MAX_DELAY,
    MIN_DELAY
  }
}
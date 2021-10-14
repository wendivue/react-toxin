import { useEffect, useCallback, useState } from 'react';

const useSizes = (sizeListener: number): boolean => {
  const [isCurrentSize, setCurrentSize] = useState(false);

  const resizeListener = useCallback(() => {
    if (window.innerWidth <= sizeListener) {
      setCurrentSize(true);
    } else {
      setCurrentSize(false);
    }
  }, [sizeListener]);

  useEffect(() => {
    setCurrentSize(window.innerWidth <= sizeListener);
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [resizeListener, sizeListener]);

  return isCurrentSize;
};

export { useSizes };

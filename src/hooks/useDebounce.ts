import { useState, useEffect } from "react";

/**
 * 값에 debounce를 적용하는 커스텀 훅
 * @param value - debounce를 적용할 값
 * @param delay - debounce 지연 시간 (밀리초, 기본값: 500ms)
 * @returns debounce된 값
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};


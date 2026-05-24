import { useRef, useCallback } from 'react';

const useThrottle = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const lastArgs = useRef<Parameters<T> | null>(null);

    return useCallback(
        (...args: Parameters<T>) => {
            if (timeoutId.current) return;

            fn(...args);

            timeoutId.current = setTimeout(() => {
                timeoutId.current = null;
            }, delay);
        },
        [fn, delay]
    );
}

export default useThrottle
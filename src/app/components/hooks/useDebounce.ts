import { useState, useEffect } from "react";

const useDebounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
    const [func, setFunc] = useState<T>(fn);
    
    useEffect(() => {
        const debouncer = setTimeout(() => setFunc(() => fn), delay);

        return () => clearTimeout(debouncer);
    }, [fn, delay]);
    
    return func;
}

export default useDebounce;
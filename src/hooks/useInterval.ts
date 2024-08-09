import { useEffect } from 'react';

const useInterval = (callback: () => void, delay: number = 1000): void => {
    useEffect(() => {
        if (delay) {
            const timerId = setInterval(() => {
                callback();
            }, delay);
            return () => {
                clearInterval(timerId);
            };
        }
    }, [delay]);
};

export default useInterval;

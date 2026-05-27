import { useState, useEffect } from 'react';

export type AvailablePlatform = "DESKTOP" | "MOBILE";

const useAccessPlatform = () => {

    const [accessPlatform, setAccessPlatform] = useState<AvailablePlatform | null>(null);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;
        if (!userAgent) {
            setAccessPlatform("DESKTOP");
            return;
        }

        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        if (mobileRegex.test(userAgent)) {
            setAccessPlatform("MOBILE");
            return;
        }

        const isMac = /Macintosh/i.test(userAgent);
        const supportMultipleTouch = navigator.maxTouchPoints && navigator.maxTouchPoints > 1;
        if (isMac && supportMultipleTouch) {
            setAccessPlatform("MOBILE");
            return;
        }

        setAccessPlatform("DESKTOP");

    }, [])

    return {
        currentPlatform: accessPlatform
    }

}

export default useAccessPlatform;
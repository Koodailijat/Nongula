import { useMemo } from 'react';

export function useTargetText(min: number, max: number, isLarge?: boolean) {
    return useMemo(() => {
        if (min && max) {
            if (isLarge) {
                return `[${min} - ${max}]`;
            }

            return `[${min}-${max}]`;
        } else if (min) {
            return `${min}`;
        }
    }, [isLarge, min, max]);
}

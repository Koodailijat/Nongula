import { CSSProperties } from 'react';

function getColor(value: number) {
    if (value < 0.2) {
        return '#00c65a';
    } else if (value < 0.4) {
        return '#19a052';
    } else if (value < 0.6) {
        return '#0b9244';
    } else if (value < 0.8) {
        return '#008537';
    } else if (value < 1.1) {
        return '#006824';
    } else if (value < 1.3) {
        return '#bcba29';
    } else if (value < 1.5) {
        return '#c23b26';
    }
    return '#941515';
}

export function getCellStyle(
    targetRatio: number,
    isSelected: boolean
): CSSProperties {
    if (targetRatio) {
        return {
            background: getColor(targetRatio),
            outline: isSelected ? '4px solid black' : 'none',
        };
    }

    return { outline: isSelected ? '4px solid black' : 'none' };
}

import { CSSProperties } from 'react';

function getColor(value: number, min: number, max: number) {
    if (value < 0.2) {
        return '#ffffff';
    } else if (value < min) {
        return '#bcba29';
    } else if (value < max) {
        return '#008537';
    }
    return '#c23b26';
}

export function getCellStyle(
    value: number,
    min: number,
    max: number,
    isSelected: boolean
): CSSProperties {
    if (value) {
        return {
            background: getColor(value, min, max),
            outline: isSelected ? '4px solid black' : 'none',
        };
    }

    return { outline: isSelected ? '4px solid black' : 'none' };
}

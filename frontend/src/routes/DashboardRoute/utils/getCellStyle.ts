import { CSSProperties } from 'react';

function getBackground(
    value: number,
    min: number,
    max: number,
    colorblind?: boolean
) {
    if (value < 0.2) {
        return {
            backgroundColor: '#ffffff',
        };
    } else if (value < min) {
        if (colorblind) {
            return {
                backgroundColor: '#bcba29',
                opacity: 0.8,
                backgroundImage:
                    'linear-gradient(0deg, #bcba29 50%, #717019 50%)',
                backgroundSize: '8px 8px',
            };
        }
        return {
            backgroundColor: '#bcba29',
        };
    } else if (value < max) {
        if (colorblind) {
            return {
                backgroundColor: '#008537',
                opacity: 0.8,
                backgroundImage:
                    'linear-gradient(135deg, #005021 25%, transparent 25%), linear-gradient(225deg, #005021 25%, transparent 25%), linear-gradient(45deg, #005021 25%, transparent 25%), linear-gradient(315deg, #005021 25%, #008537 25%)',
                backgroundPosition: '8px 0, 8px 0, 0 0, 0 0',
                backgroundSize: '16px 16px',
                backgroundRepeat: 'repeat',
            };
        }
        return {
            backgroundColor: '#008537',
        };
    }
    if (colorblind) {
        return {
            backgroundColor: '#c23b26',
            opacity: 0.8,
            backgroundImage:
                'repeating-linear-gradient(45deg, #742317 25%, transparent 25%, transparent 75%, #742317 75%, #742317), repeating-linear-gradient(45deg, #742317 25%, #c23b26 25%, #c23b26 75%, #742317 75%, #742317)',
            backgroundPosition: '0 0, 8px 8px',
            backgroundSize: '16px 16px',
        };
    }
    return {
        backgroundColor: '#c23b26',
    };
}

export function getCellStyle(
    value: number,
    min: number,
    max: number,
    colorblind?: boolean
): CSSProperties {
    if (value) {
        return {
            ...getBackground(value, min, max, colorblind),
        };
    }

    return {};
}

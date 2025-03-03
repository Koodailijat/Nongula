import { useProgressBar } from 'react-aria';
import { useMediaQuery } from 'usehooks-ts';

interface CircularProgressBarProps {
    /** Value to show **/
    value: number;
    /** Heading text **/
    heading?: string;
    /** Target value, use this if you want to use custom target, defaults to 100 **/
    target_min?: number;
    target_max?: number;
    targetText?: string;
    isLoading?: boolean;
}

function getColor(value: number, min: number, max: number) {
    if (value === 0) {
        return 'transparent';
    } else if (value < min) {
        return '#bcba29';
    } else if (value < max) {
        return '#519A58';
    }
    return '#c23b26';
}

export function CircularProgressBar({
    value,
    heading,
    target_min,
    target_max,
    targetText,
    isLoading,
}: CircularProgressBarProps) {
    const isDesktopMode = useMediaQuery('(min-width: 500px)');
    const target = target_min ?? 100;
    const { progressBarProps } = useProgressBar({
        minValue: 0,
        maxValue: target,
        value,
        label: `Progress bar with target value of ${target} and current value of ${value}`,
    });
    return (
        <svg
            width={isDesktopMode ? '425' : '300'}
            height={isDesktopMode ? '425' : '300'}
            viewBox={isDesktopMode ? '0 0 425 425' : '0 0 300 300'}
            {...progressBarProps}>
            <circle
                r={isDesktopMode ? '180' : '105'}
                cx={isDesktopMode ? '212.5' : '150'}
                cy={isDesktopMode ? '212.5' : '150'}
                fill="transparent"
                strokeWidth={isDesktopMode ? '3rem' : '2rem'}
                stroke="#E1E1E1"
            />
            {!isLoading && (
                <circle
                    r={isDesktopMode ? '180' : '105'}
                    cx={isDesktopMode ? '212.5' : '150'}
                    cy={isDesktopMode ? '212.5' : '150'}
                    fill="transparent"
                    stroke={getColor(
                        value,
                        target_min ?? 100,
                        target_max ?? 100
                    )}
                    pathLength="100"
                    strokeWidth={isDesktopMode ? '2rem' : '1.25rem'}
                    strokeDasharray={`${(value / target) * 100} ${100 - (value / target) * 100}`}
                    strokeDashoffset="75"
                    strokeLinecap="round"
                    className="circular-progress-bar__progress"
                />
            )}
            <text
                x="50%"
                y="38%"
                textAnchor="middle"
                className="circular-progress-bar__text">
                {heading}
            </text>
            {!isLoading && (
                <text
                    x="50%"
                    y={!heading && target ? '50%' : '52%'}
                    textAnchor="middle"
                    className="circular-progress-bar__text-value">
                    {target ? `${value}` : `${value}%`}
                </text>
            )}
            <text
                x="50%"
                y={!heading && target ? '60%' : '62%'}
                textAnchor="middle"
                className="circular-progress-bar__text">
                {targetText}
            </text>
        </svg>
    );
}

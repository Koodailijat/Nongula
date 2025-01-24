import { useProgressBar } from 'react-aria';

interface CircularProgressBarProps {
    /** Value to show **/
    value: number;
    /** Heading text **/
    heading?: string;
    /** Target value, use this if you want to use custom target, defaults to 100 **/
    target?: number;
}

export function CircularProgressBar({
    value,
    heading,
    target,
}: CircularProgressBarProps) {
    const targetValue = target ?? 100;
    const { progressBarProps } = useProgressBar({
        minValue: 0,
        maxValue: targetValue,
        value,
        label: `Progress bar with target value of ${targetValue} and current value of ${value}`,
    });
    return (
        <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            {...progressBarProps}>
            <circle
                r="70"
                cx="100"
                cy="100"
                fill="transparent"
                strokeWidth="1.25rem"
                stroke="#E1E1E1"
            />
            <circle
                r="70"
                cx="100"
                cy="100"
                fill="transparent"
                stroke="#519A58"
                pathLength="100"
                strokeWidth="1.25rem"
                strokeDasharray={`${(value / targetValue) * 100} ${100 - (value / targetValue) * 100}`}
                strokeDashoffset={75}
                strokeLinecap="round"
                className="circular-progress-bar__progress"
            />
            <text
                x="50%"
                y="38%"
                textAnchor="middle"
                className={'circular-progress-bar__text'}>
                {heading}
            </text>
            <text
                x="50%"
                y={!heading && target ? '50%' : '52%'}
                textAnchor="middle"
                className={'circular-progress-bar__text-value'}>
                {target ? `${value}` : `${value}%`}
            </text>
            <text
                x="50%"
                y={!heading && target ? '60%' : '62%'}
                textAnchor="middle"
                className={'circular-progress-bar__text'}>
                {target ? `/ ${target ?? `${target}`}` : ''}
            </text>
        </svg>
    );
}

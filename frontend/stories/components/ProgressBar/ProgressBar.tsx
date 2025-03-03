import {
    ProgressBar as RAProgressBar,
    Label as RALabel,
} from 'react-aria-components';

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

interface ProgressBarProps {
    label: string;
    target_min: number;
    target_max?: number;
    value: number;
    valueText: string;
    isLoading?: boolean;
}

/** Primary UI component for progress bar */
export const ProgressBar = ({
    label,
    value,
    target_min,
    target_max,
    valueText,
    isLoading,
}: ProgressBarProps) => {
    const target = target_min ?? 100;
    return (
        <RAProgressBar value={value} className="progress-bar">
            <RALabel>{label}</RALabel>
            {!isLoading && (
                <span className="progress-bar__value">{valueText}</span>
            )}
            <div className="progress-bar__bar">
                {!isLoading && (
                    <div
                        className="progress-bar__bar-fill"
                        style={{
                            width: (value / target) * 100 + '%',
                            background: getColor(
                                value,
                                target_min,
                                target_max ?? Infinity
                            ),
                        }}
                    />
                )}
            </div>
        </RAProgressBar>
    );
};

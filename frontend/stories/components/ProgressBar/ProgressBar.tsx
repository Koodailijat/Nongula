import {
    ProgressBar as RAProgressBar,
    Label as RALabel,
} from 'react-aria-components';

function getColor(value: number) {
    if (value < 1.1) {
        return '#519a58';
    } else if (value < 1.3) {
        return '#bcba29';
    } else if (value < 1.5) {
        return '#c23b26';
    }
    return '#941515';
}
interface ProgressBarProps {
    label: string;
    targetValue?: number;
    value: number;
    valueText: string;
    isLoading?: boolean;
}

/** Primary UI component for progress bar */
export const ProgressBar = ({
    label,
    value,
    targetValue,
    valueText,
    isLoading,
}: ProgressBarProps) => {
    const target = targetValue ?? 100;
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
                            background: getColor(value / target),
                        }}
                    />
                )}
            </div>
        </RAProgressBar>
    );
};

import {
    ToggleButton as RAToggleButton,
    ToggleButtonProps as RAToggleButtonProps,
} from 'react-aria-components';

export const ToggleButton = ({ children, ...props }: RAToggleButtonProps) => {
    return (
        <RAToggleButton {...props} className="toggle-button">
            {children}
        </RAToggleButton>
    );
};

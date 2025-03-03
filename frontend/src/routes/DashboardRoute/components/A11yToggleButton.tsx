import { ToggleButton } from '../../../../stories/components/ToggleButton/ToggleButton.tsx';
import { Eye } from 'lucide-react';
import { useIsDesktopMode } from '../../../hooks/useIsDesktopMode.tsx';

interface A11yToggleButtonProps {
    isSelected?: boolean;
    onChange?: (isSelected: boolean) => void;
}

export function A11yToggleButton({ ...props }: A11yToggleButtonProps) {
    const isDesktopMode = useIsDesktopMode();
    return (
        <ToggleButton {...props} className="a11y-toggle-button">
            <Eye />
            {isDesktopMode ? 'Accessible colors' : ''}
        </ToggleButton>
    );
}

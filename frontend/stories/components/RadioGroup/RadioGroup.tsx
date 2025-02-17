import {
    FieldError,
    Label,
    RadioGroup as RARadioGroup,
} from 'react-aria-components';
import { ReactNode } from 'react';

interface RadioGroupProps {
    children: ReactNode;
    label: string;
    errorMessage?: string;
}

export function RadioGroup({ children, label, errorMessage }: RadioGroupProps) {
    return (
        <RARadioGroup>
            <Label className="radio-group__label">{label}</Label>
            <div className="radio-group__children">{children}</div>
            <FieldError>{errorMessage}</FieldError>
        </RARadioGroup>
    );
}

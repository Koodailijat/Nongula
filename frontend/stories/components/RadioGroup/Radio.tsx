import { Radio as RARadio } from 'react-aria-components';
import { ReactNode } from 'react';

interface RadioProps {
    children: ReactNode;
    value: string;
}

export function Radio({ children, value }: RadioProps) {
    return <RARadio value={value}>{children}</RARadio>;
}

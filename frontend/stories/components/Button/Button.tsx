import { ReactNode } from 'react';
import {
    Button as RAButton,
    ButtonProps as RAButtonProps,
} from 'react-aria-components';
import { Spinner } from '../Spinner/Spinner.tsx';

export interface ButtonProps extends RAButtonProps {
    children?: ReactNode;
    /** Icon as react component */
    icon?: ReactNode;
    /** Button variant */
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({
    children,
    className,
    icon,
    variant = 'primary',
    ...props
}: ButtonProps) => {
    return (
        <RAButton
            className={[
                'button',
                `button--${variant}`,
                'button--primary',
                className,
            ].join(' ')}
            {...props}>
            {props.isPending ? (
                <Spinner fill={props.isDisabled ? 'gray' : 'white'} />
            ) : (
                icon
            )}
            {children}
        </RAButton>
    );
};

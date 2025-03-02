import { ComponentProps } from 'react';

type TextProps = ComponentProps<'span'> & {
    /** Text variant **/
    variant?: 'dark' | 'neutral' | 'light';
    /** Text size **/
    size?: 'small' | 'medium' | 'large';
};

/** Primary UI component for text */
export const Text = ({
    children,
    size = 'medium',
    variant = 'dark',
    className,
    ...props
}: TextProps) => {
    return (
        <span
            className={[`text--${size}`, `text--${variant}`, className].join(
                ' '
            )}
            {...props}>
            {children}
        </span>
    );
};

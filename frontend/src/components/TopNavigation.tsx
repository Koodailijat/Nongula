import { ComponentProps } from 'react';

export function TopNavigation({ children, ...props }: ComponentProps<'div'>) {
    return (
        <div {...props} className="top-navigation">
            {children}
        </div>
    );
}

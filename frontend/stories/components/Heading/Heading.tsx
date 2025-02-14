import { ComponentProps, ElementType } from 'react';

type HeadingProps = ComponentProps<'h1'> & {
    /** Heading level **/
    level: 1 | 2 | 3 | 4 | 5 | 6;
};

export function Heading({
    children,
    level,
    className,
    ...props
}: HeadingProps) {
    const HeadingElement = `h${level}` as ElementType;
    return (
        <HeadingElement
            className={['heading', `heading--level-${level}`, className].join(
                ' '
            )}
            {...props}>
            {children}
        </HeadingElement>
    );
}

import { ListBox, ListBoxProps } from 'react-aria-components';
import { ListItem } from './ListItem.tsx';
import { Spinner } from '../Spinner/Spinner.tsx';
import { EyeOff } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

interface ListProps<T> extends ListBoxProps<T> {
    isLoading?: boolean;
}

export function List<T extends object>({
    children,
    className,
    isLoading,
    ...props
}: ListProps<T>) {
    const content = useMemo((): ReactNode | ((item: T) => ReactNode) => {
        if (isLoading) {
            return (
                <ListItem className="modify-route__list-item__no-results-found">
                    <Spinner />
                    <span>Loading...</span>
                </ListItem>
            );
        }

        return Array.from(props.items ? props.items : []).length > 0 ? (
            children
        ) : (
            <ListItem className="modify-route__list-item__no-results-found">
                <EyeOff />
                <span>No items found</span>
            </ListItem>
        );
    }, [children, props.items]);

    return (
        <ListBox
            aria-label="List"
            data-loading={isLoading}
            className={`list ${className}`}
            autoFocus={false}
            {...props}>
            {content}
        </ListBox>
    );
}

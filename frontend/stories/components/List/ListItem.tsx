import { ListBoxItem, ListBoxItemProps } from 'react-aria-components';

export function ListItem({ className, textValue, ...props }: ListBoxItemProps) {
    return (
        <ListBoxItem
            {...props}
            textValue={textValue}
            className={`list-item ${className}`}
        />
    );
}

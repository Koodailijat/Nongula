import {
    Input as RAInput,
    Label as RALabel,
    ListBox as RAListBox,
    ListBoxItem as RAListBoxItem,
    Popover as RAPopover,
    Select as RASelect,
    Button as RAButton,
    SelectValue as RASelectValue,
} from 'react-aria-components';
import { AriaSelectProps as RASelectProps } from '@react-types/select';
import { EyeOff, SearchIcon } from 'lucide-react';
import { RefObject, useMemo, useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';

interface ListItem {
    id: string | number;
    name: string;
}

type DropdownProps<T> = Omit<RASelectProps<T>, 'children'> & {
    isLoading?: boolean;
};

export function Dropdown<T extends ListItem>({
    label,
    ...props
}: DropdownProps<T>) {
    const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const { width } = useResizeObserver<HTMLDivElement>({ ref });

    return (
        <RASelect className="dropdown__select" ref={ref} {...props}>
            {label && <RALabel className="dropdown__label">{label}</RALabel>}
            <RAButton className="dropdown__button">
                <RASelectValue className="dropdown__select-value" />
                <span aria-hidden="true">▼</span>
            </RAButton>
            <RAPopover className="dropdown__popover" style={{ width }}>
                <RAListBox items={props.items} className="dropdown__list-box">
                    {(item: ListItem) => (
                        <RAListBoxItem
                            textValue={item.name}
                            id={item.id}
                            key={item.id}
                            className="dropdown__list-box-item">
                            {item.name}
                        </RAListBoxItem>
                    )}
                </RAListBox>
            </RAPopover>
        </RASelect>
    );
}

import {
    ComboBox as RAComboBox,
    Input as RAInput,
    Label as RALabel,
    ListBox as RAListBox,
    ListBoxItem as RAListBoxItem,
    Popover as RAPopover,
    useFilter,
} from 'react-aria-components';
import { AriaComboBoxProps as RAComboBoxProps } from '@react-types/combobox';
import { EyeOff, SearchIcon } from 'lucide-react';
import { RefObject, useMemo, useRef, useState } from 'react';
import { useResizeObserver } from 'usehooks-ts';
import Spinner from '../../media/spinner.svg';

interface ListItem {
    id: string | number;
    name: string;
}

function useCustomFilter<T extends ListItem>({
    items,
    filterValue,
}: {
    items: Iterable<T> | undefined;
    filterValue: string;
}) {
    const { contains } = useFilter({ sensitivity: 'base' });
    return useMemo(
        () =>
            items
                ? Array.from(items).filter((item) =>
                      contains(
                          item.name.toLowerCase(),
                          filterValue.toLowerCase()
                      )
                  )
                : [],
        [items, contains, filterValue]
    );
}

type SearchBarProps<T> = Omit<RAComboBoxProps<T>, 'children'> & {
    isLoading?: boolean;
};

export function SearchBar<T extends ListItem>({
    isLoading,
    items,
    label,
    onInputChange,
    ...props
}: SearchBarProps<T>) {
    const ref: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    const { width } = useResizeObserver<HTMLDivElement>({ ref });
    const [filterValue, setFilterValue] = useState('');
    const filteredItems = useCustomFilter({ items, filterValue });
    const noResults = useMemo(
        () => filterValue.length === 0 || filteredItems.length === 0,
        [filterValue, filteredItems]
    );

    function handleInputChange(value: string) {
        if (onInputChange) {
            onInputChange(value);
        }
        setFilterValue(value);
    }

    return (
        <RAComboBox
            allowsCustomValue
            allowsEmptyCollection
            className="search-bar__combo-box"
            inputValue={filterValue}
            items={filteredItems}
            menuTrigger="focus"
            onInputChange={handleInputChange}
            ref={ref}
            {...props}>
            {label && <RALabel className="search-bar__label">{label}</RALabel>}
            <div className="search-bar__input-container">
                <div className="search-bar-icon search-bar-icon--left">
                    <SearchIcon />
                </div>
                <RAInput className="search-bar__input" />
                {isLoading && (
                    <div className="search-bar-icon search-bar-icon--right">
                        <Spinner />
                    </div>
                )}
            </div>
            <RAPopover className="search-bar__popover" style={{ width }}>
                {!noResults ? (
                    <RAListBox className="search-bar__list-box">
                        {(item: ListItem) => (
                            <RAListBoxItem
                                textValue={item.name}
                                id={item.id}
                                key={item.id}
                                className="search-bar__list-box-item">
                                {item.name}
                            </RAListBoxItem>
                        )}
                    </RAListBox>
                ) : (
                    <RAListBox className="search-bar__list-box">
                        <RAListBoxItem className="search-bar__list-box-item no-results-found">
                            <EyeOff />
                            <span>No results found</span>
                        </RAListBoxItem>
                    </RAListBox>
                )}
            </RAPopover>
        </RAComboBox>
    );
}

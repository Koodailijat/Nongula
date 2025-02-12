import { keepPreviousData, skipToken, useQuery } from '@tanstack/react-query';
import { getFoodItems } from '../services/fineli.ts';
import { useDebounceValue } from 'usehooks-ts';
import { useEffect } from 'react';

export function useFineliQuery(search: string) {
    const [debouncedSearch, setDebouncedSearch] = useDebounceValue('', 500);

    useEffect(() => {
        setDebouncedSearch(search);
    }, [search, setDebouncedSearch]);

    return useQuery({
        queryKey: ['foodItems', debouncedSearch],
        queryFn: debouncedSearch ? getFoodItems : skipToken,
        placeholderData: keepPreviousData,
        enabled: !!debouncedSearch,
    });
}

import { keepPreviousData, skipToken, useQuery } from '@tanstack/react-query';
import { getFoodItems } from '../services/fineliService.ts';
import { useDebounceValue } from 'usehooks-ts';
import { useEffect } from 'react';
import { queryKeys } from '../../constants/queryKeys.ts';

export function useFineliQuery(search: string) {
    const [debouncedSearch, setDebouncedSearch] = useDebounceValue('', 500);

    useEffect(() => {
        setDebouncedSearch(search);
    }, [search, setDebouncedSearch]);

    return useQuery({
        queryKey: [queryKeys.fineli, debouncedSearch],
        queryFn: debouncedSearch
            ? () => getFoodItems(debouncedSearch)
            : skipToken,
        placeholderData: keepPreviousData,
        enabled: !!debouncedSearch,
    });
}

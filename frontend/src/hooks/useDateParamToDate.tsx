import { isValid, parseISO } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';

export function useDateParamToDate() {
    const stringDate = useParams().date;
    const datetime = useMemo(() => parseISO(stringDate!), [stringDate]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValid(datetime)) {
            navigate('/');
            return;
        }
    }, [datetime, navigate]);

    return datetime;
}

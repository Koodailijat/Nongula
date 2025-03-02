import { useMediaQuery } from 'usehooks-ts';

export function useIsDesktopMode() {
    return useMediaQuery('(min-width: 500px)');
}

import { ToastQueue, useToastQueue } from '@react-stately/toast';
import { createPortal } from 'react-dom';
import { ToastRegion } from './ToastRegion';
import { AriaToastRegionProps } from '@react-aria/toast';
import { ToastContent } from './Toast';

export const toastQueue = new ToastQueue<ToastContent>({
    maxVisibleToasts: 3,
    hasExitAnimation: true,
});

export function GlobalToastRegion(props: AriaToastRegionProps) {
    const state = useToastQueue<ToastContent>(toastQueue);

    return state.visibleToasts.length > 0
        ? createPortal(<ToastRegion {...props} state={state} />, document.body)
        : null;
}

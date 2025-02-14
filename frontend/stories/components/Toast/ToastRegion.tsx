import { AriaToastRegionProps, useToastRegion } from '@react-aria/toast';
import { ToastState } from '@react-stately/toast';
import { useRef } from 'react';
import { Toast, ToastContent } from './Toast';

interface ToastRegionProps<T> extends AriaToastRegionProps {
    state: ToastState<T>;
}

export function ToastRegion<T extends ToastContent>({
    state,
    ...props
}: ToastRegionProps<T>) {
    const ref = useRef(null);
    const { regionProps } = useToastRegion(props, state, ref);
    return (
        <div {...regionProps} ref={ref} className="toast-region">
            {state.visibleToasts.map((toast) => (
                <Toast key={toast.key} toast={toast} state={state} />
            ))}
        </div>
    );
}

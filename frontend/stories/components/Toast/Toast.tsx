import { useToast, AriaToastProps } from '@react-aria/toast';
import { ReactNode, useRef } from 'react';
import { ToastState } from '@react-stately/toast';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import { Button } from 'react-aria-components';

interface ToastProps<T> extends AriaToastProps<T> {
    state: ToastState<T>;
}

export interface ToastContent {
    element: ReactNode;
    severity: 'info' | 'success' | 'warning' | 'danger';
}

export function getToastIcon(
    severity: 'info' | 'success' | 'warning' | 'danger'
) {
    switch (severity) {
        case 'info':
            return <Info />;
        case 'success':
            return <CircleCheck />;
        case 'warning':
            return <TriangleAlert />;
        case 'danger':
            return <CircleAlert />;
        default:
            return null;
    }
}

export function Toast<T extends ToastContent>({
    state,
    ...props
}: ToastProps<T>) {
    const ref = useRef<HTMLDivElement>(null);
    const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
        props,
        state,
        ref
    );
    return (
        <div
            {...toastProps}
            ref={ref}
            className={`toast toast--${props.toast.content.severity} ${props.toast.animation === 'entering' ? 'toast--entering' : ''} ${props.toast.animation === 'exiting' ? 'toast--exiting' : ''}`}
            data-animation={props.toast.animation}
            onAnimationEnd={() => {
                if (props.toast.animation === 'exiting') {
                    state.remove(props.toast.key);
                }
            }}>
            <div {...contentProps} className="toast-container">
                <div>{getToastIcon(props.toast.content.severity)}</div>
                <div {...titleProps}>{props.toast.content.element}</div>
            </div>
            <Button className="toast-button" {...closeButtonProps}>
                <X />
            </Button>
        </div>
    );
}

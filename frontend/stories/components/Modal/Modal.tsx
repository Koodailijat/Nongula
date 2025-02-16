import { ReactNode } from 'react';
import {
    Dialog as RADialog,
    Modal as RAModal,
    ModalOverlay as RAModalOverlay,
    ModalOverlayProps,
} from 'react-aria-components';

interface ModalProps extends ModalOverlayProps {
    /**
     * Dialog content.
     */
    children: ReactNode;
    /**
     * Is overlay open by default
     */
    isOpen: boolean;
    /**
     * Called when the overlay's open state changes.
     */
    onChange?: ((value: boolean) => void) | undefined;
    /**
     * Size of the modal
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Aria label for the modal
     */
    ['aria-label']: string;
}

export function Modal({ children, size = 'small', ...props }: ModalProps) {
    function onOpenChange(nextValue: boolean) {
        if (props.onChange) props.onChange(nextValue);
    }

    return (
        <RAModalOverlay
            {...props}
            isDismissable
            isOpen={props.isOpen}
            onOpenChange={onOpenChange}>
            <RAModal className={`modal modal--${size}`}>
                <RADialog aria-label={props['aria-label']}>
                    <div className="dialog-container">{children}</div>
                </RADialog>
            </RAModal>
        </RAModalOverlay>
    );
}

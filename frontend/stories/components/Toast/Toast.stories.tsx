import { StoryObj, Meta } from '@storybook/react';
import { Toast } from './Toast';
import { Button } from '../Button/Button.tsx';
import { GlobalToastRegion, toastQueue } from './GlobalToastRegion';

const meta: Meta<typeof Toast> = {
    component: Toast,
    title: 'Toast',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
    render: () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                <Button
                    variant="primary"
                    onPress={() =>
                        toastQueue.add({
                            element: 'New update',
                            severity: 'info',
                        })
                    }>
                    Show primary
                </Button>
                <Button
                    variant="primary"
                    onPress={() =>
                        toastQueue.add({
                            element: 'Data updated',
                            severity: 'success',
                        })
                    }>
                    Show success
                </Button>
                <Button
                    variant="primary"
                    onPress={() =>
                        toastQueue.add({
                            element: 'Change password',
                            severity: 'warning',
                        })
                    }>
                    Show warning
                </Button>
                <Button
                    variant="primary"
                    onPress={() =>
                        toastQueue.add({
                            element: 'Error 401',
                            severity: 'danger',
                        })
                    }>
                    Show danger
                </Button>
                <GlobalToastRegion />
            </div>
        );
    },
};

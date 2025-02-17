import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar.tsx';

const meta: Meta<typeof ProgressBar> = {
    title: 'ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        return (
            <div style={{ width: '250px' }}>
                <ProgressBar
                    label={"Today's calories"}
                    value={65}
                    valueText={'1722 kcal'}
                />
            </div>
        );
    },
};

export const WithPercentage: Story = {
    render: () => {
        return (
            <div style={{ width: '250px' }}>
                <ProgressBar label={'Progress'} value={24} valueText={'24%'} />
            </div>
        );
    },
};

export const Loading: Story = {
    render: () => {
        return (
            <div style={{ width: '250px' }}>
                <ProgressBar
                    isLoading={true}
                    label={"Today's calories"}
                    value={65}
                    valueText={'1722 kcal'}
                />
            </div>
        );
    },
};

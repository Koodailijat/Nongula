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
                    value={260}
                    target_min={1722}
                    valueText={'1722 kcal'}
                />
            </div>
        );
    },
};

export const Colors: Story = {
    render: () => {
        return (
            <div
                style={{
                    width: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                <ProgressBar
                    value={0}
                    target_min={2150}
                    target_max={2650}
                    label="white"
                    valueText="0 / [2150 - 2650]"
                />
                <ProgressBar
                    value={1650}
                    target_min={2150}
                    target_max={2650}
                    label="yellow"
                    valueText="1650 / [2150 - 2650]"
                />
                <ProgressBar
                    value={2320}
                    target_min={2150}
                    target_max={2650}
                    label="green"
                    valueText="2320 / [2150 - 2650]"
                />
                <ProgressBar
                    value={2860}
                    target_min={2150}
                    target_max={2650}
                    label="red"
                    valueText="2860 / [2150 - 2650]"
                />
            </div>
        );
    },
};

export const WithPercentage: Story = {
    render: () => {
        return (
            <div style={{ width: '250px' }}>
                <ProgressBar
                    label={'Progress'}
                    value={24}
                    target_min={100}
                    valueText={'24%'}
                />
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
                    target_min={1722}
                    valueText={'1722 kcal'}
                />
            </div>
        );
    },
};

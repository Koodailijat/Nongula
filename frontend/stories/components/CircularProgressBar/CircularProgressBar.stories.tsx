import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgressBar } from './CircularProgressBar.tsx';

const meta: Meta<typeof CircularProgressBar> = {
    title: 'CircularProgressBar',
    component: CircularProgressBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'range', min: 0, max: 100, step: 1, defaultValue: 0 },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 50,
        target_min: 100,
        targetText: '100',
    },
};

export const Loading: Story = {
    args: {
        value: 0,
        isLoading: true,
    },
};

export const Colors: Story = {
    render: () => {
        return (
            <div>
                <CircularProgressBar
                    value={0}
                    target_min={2150}
                    target_max={2650}
                    targetText="2650"
                />
                <CircularProgressBar
                    value={1650}
                    target_min={2150}
                    target_max={2650}
                    targetText="2650"
                />
                <CircularProgressBar
                    value={2320}
                    target_min={2150}
                    target_max={2650}
                    targetText="2650"
                />
                <CircularProgressBar
                    value={2860}
                    target_min={2150}
                    target_max={2650}
                    targetText="2650"
                />
            </div>
        );
    },
};

export const WithTargetValue: Story = {
    args: {
        value: 50,
        target_min: 100,
        targetText: '/ 100',
    },
};

export const WithHeading: Story = {
    args: {
        value: 50,
        heading: 'Progress',
    },
};

export const WithHeadingAndTarget: Story = {
    args: {
        value: 1240,
        heading: 'Calories',
        target_min: 2100,
        targetText: '/ 2100 kcals',
    },
};

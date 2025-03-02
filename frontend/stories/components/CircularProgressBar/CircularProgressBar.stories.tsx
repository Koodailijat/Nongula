import type { Meta, StoryObj } from '@storybook/react';
import { CircularProgressBar } from './CircularProgressBar.tsx';

const meta = {
    title: 'CircularProgressBar',
    component: CircularProgressBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'range', min: 0, max: 100, step: 1, defaultValue: 0 },
    },
} satisfies Meta<typeof CircularProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 50,
    },
};

export const Loading: Story = {
    args: {
        value: 0,
        isLoading: true,
    },
};

export const WithTargetValue: Story = {
    args: {
        value: 50,
        target: 100,
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
        target: 2100,
    },
};

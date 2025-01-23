import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';

const meta = {
    title: 'Example/Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    tags: ['autodocs'],

    argTypes: {
        backgroundColor: { control: 'color' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};

export const Medium: Story = {
    args: {
        primary: true,
        label: 'Button',
    },
};

export const Large_and_outlined: Story = {
    args: {
        primary: true,
        size: 'large',
        label: 'Button',
        style: 'outlined',
    },
};

export const Small: Story = {
    args: {
        primary: true,
        size: 'small',
        label: 'Button',
        style: 'none ',
    },
};

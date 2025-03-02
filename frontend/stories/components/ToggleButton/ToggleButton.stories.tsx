import type { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from './ToggleButton.tsx';

const meta = {
    title: 'ToggleButton',
    component: ToggleButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Toggle Button' } };

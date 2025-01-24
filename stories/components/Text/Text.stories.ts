import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
    title: 'Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Lorem ipsum dolor sit amet, consetetur',
        size: 'medium',
    },
};

export const Small: Story = {
    args: {
        children: 'Lorem ipsum dolor sit amet, consetetur',
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        children: 'Lorem ipsum dolor sit amet, consetetur',
        size: 'large',
    },
};

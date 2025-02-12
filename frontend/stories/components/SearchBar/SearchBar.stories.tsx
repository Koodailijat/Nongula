import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar.tsx';

const meta: Meta<typeof SearchBar> = {
    title: 'SearchBar',
    component: SearchBar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Search',
        label: 'Search food items',
        items: [
            { id: 1, name: '321 calories' },
            { id: 2, name: '1502 calories' },
            { id: 3, name: '1259 calories' },
            { id: 4, name: '2565 calories' },
            { id: 5, name: '753 calories' },
        ],
    },
};

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
            { id: 1, name: 'Chicken' },
            { id: 2, name: 'Chicken soup' },
            { id: 3, name: 'Ground beef' },
            { id: 4, name: 'Spaghetti' },
            { id: 5, name: 'Fish and chips' },
        ],
    },
};

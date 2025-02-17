import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown.tsx';

const meta: Meta<typeof Dropdown> = {
    title: 'Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'Physical activity',
        label: 'Select physical activity',
        items: [
            { id: 1, name: 'Not active' },
            { id: 2, name: 'Moderately active' },
            { id: 3, name: 'Active' },
        ],
    },
    render: (args) => (
        <div style={{ display: 'flex', width: '200px' }}>
            <Dropdown {...args} />
        </div>
    ),
};

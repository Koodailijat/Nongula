import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField.tsx';
import { SearchIcon } from 'lucide-react';

const meta = {
    title: 'TextField',
    component: TextField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: { control: 'text' },
    },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div style={{ width: '250px' }}>
            <TextField label="Search" placeholder="Search" />
        </div>
    ),
};

export const Icons: Story = {
    render: () => (
        <div style={{ width: '250px' }}>
            <TextField
                label="Right"
                placeholder="Right"
                iconSide="right"
                icon={<SearchIcon />}
            />
            <TextField
                label="Left"
                placeholder="Left"
                iconSide="left"
                icon={<SearchIcon />}
            />
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div style={{ width: '250px' }}>
            <TextField
                isDisabled={true}
                label="Right"
                placeholder="Right"
                iconSide="right"
                icon={<SearchIcon />}
            />
            <TextField
                isDisabled={true}
                label="Left"
                placeholder="Left"
                iconSide="left"
                icon={<SearchIcon />}
            />
        </div>
    ),
};

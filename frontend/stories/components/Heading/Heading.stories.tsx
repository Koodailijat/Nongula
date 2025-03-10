import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading.tsx';

const meta: Meta<typeof Heading> = {
    title: 'Heading',
    component: Heading,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Levels: Story = {
    render: () => {
        return (
            <div>
                <Heading level={1}>Heading 1</Heading>
                <Heading level={2}>Heading 2</Heading>
                <Heading level={3}>Heading 3</Heading>
                <Heading level={4}>Heading 4</Heading>
                <Heading level={5}>Heading 5</Heading>
                <Heading level={6}>Heading 6</Heading>
            </div>
        );
    },
};

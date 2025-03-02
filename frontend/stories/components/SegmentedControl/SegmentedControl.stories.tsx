import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl.tsx';
import { useState } from 'react';

const meta: Meta<typeof SegmentedControl> = {
    title: 'SegmentedControl',
    component: SegmentedControl,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [selected, setSelected] = useState(0);
        const segments = ['First', 'Second', 'Third'];
        return (
            <SegmentedControl
                selected={selected}
                setSelected={setSelected}
                segments={segments}
            />
        );
    },
};

export const TwoSegments: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [selected, setSelected] = useState(0);
        const segments = ['First', 'Second'];
        return (
            <SegmentedControl
                selected={selected}
                setSelected={setSelected}
                segments={segments}
            />
        );
    },
};

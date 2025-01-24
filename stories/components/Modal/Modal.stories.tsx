import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal.tsx';
import { Heading } from '../Heading/Heading.tsx';
import { TextField } from '../TextField/TextField.tsx';
import { Button } from '../Button/Button.tsx';
import { Text } from '../Text/Text.tsx';
import { Dispatch, SetStateAction, useState } from 'react';

const meta: Meta<typeof Modal> = {
    title: 'Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

function ExampleContent({
    setOpen,
}: {
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Heading level={3}>Modal example</Heading>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                <Text>Example form</Text>
                <TextField placeholder="Username" />
                <TextField type="password" placeholder="Password" />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button onPress={() => setOpen(false)}>Cancel</Button>
                <Button onPress={() => setOpen(false)}>Delete</Button>
            </div>
        </div>
    );
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpen, setOpen] = useState(false);

        const onChange = (nextValue: boolean) => {
            setOpen(nextValue);
        };

        return (
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button onPress={() => setOpen(true)}>Open</Button>
                <Modal isOpen={isOpen} onChange={onChange}>
                    <ExampleContent setOpen={setOpen} />
                </Modal>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpenSmall, setOpenSmall] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpenMedium, setOpenMedium] = useState(false);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [isOpenLarge, setOpenLarge] = useState(false);

        const onChangeSmall = (nextValue: boolean) => {
            setOpenSmall(nextValue);
        };
        const onChangeMd = (nextValue: boolean) => {
            setOpenMedium(nextValue);
        };
        const onChangeLg = (nextValue: boolean) => {
            setOpenLarge(nextValue);
        };

        return (
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button onPress={() => setOpenSmall(true)}>small</Button>
                <Modal
                    size="small"
                    isOpen={isOpenSmall}
                    onChange={onChangeSmall}>
                    <ExampleContent setOpen={setOpenSmall} />
                </Modal>
                <Button onPress={() => setOpenMedium(true)}>medium</Button>
                <Modal
                    size="medium"
                    isOpen={isOpenMedium}
                    onChange={onChangeMd}>
                    <ExampleContent setOpen={setOpenMedium} />
                </Modal>
                <Button onPress={() => setOpenLarge(true)}>large</Button>
                <Modal size="large" isOpen={isOpenLarge} onChange={onChangeLg}>
                    <ExampleContent setOpen={setOpenLarge} />
                </Modal>
            </div>
        );
    },
};

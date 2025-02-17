import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List.tsx';
import { Text } from '../Text/Text.tsx';
import { ListItem } from './ListItem.tsx';
import { IconButton } from '../IconButton/IconButton.tsx';
import { Pen, Trash } from 'lucide-react';
import { useListData } from 'react-stately';

const meta: Meta<typeof List> = {
    title: 'List',
    component: List,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    render: () => {
        const initialItems = [
            { id: 1, text: '321 calories' },
            { id: 2, text: '1502 calories' },
            { id: 3, text: '1259 calories' },
            { id: 4, text: '2565 calories' },
            { id: 5, text: '753 calories' },
        ];

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const list = useListData({
            initialItems,
        });

        return (
            <List items={list.items}>
                {(item) => (
                    <ListItem key={item.id} id={item.id} textValue={item.text}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                            }}>
                            <Text>{item.text}</Text>
                            <div style={{ display: 'flex' }}>
                                <IconButton icon={<Pen strokeWidth={3} />} />
                                <IconButton
                                    icon={<Trash strokeWidth={3} color="red" />}
                                    onPress={() => {
                                        list.remove(item.id);
                                    }}
                                />
                            </div>
                        </div>
                    </ListItem>
                )}
            </List>
        );
    },
};

export const Loading: Story = {
    render: () => {
        const initialItems = [{ id: 1, text: '321 calories' }];

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const list = useListData({
            initialItems,
        });

        return (
            <List isLoading={true} items={list.items}>
                {(item) => (
                    <ListItem key={item.id} id={item.id} textValue={item.text}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '16px',
                            }}>
                            <Text>{item.text}</Text>
                            <div style={{ display: 'flex' }}>
                                <IconButton icon={<Pen strokeWidth={3} />} />
                                <IconButton
                                    icon={<Trash strokeWidth={3} color="red" />}
                                    onPress={() => {
                                        list.remove(item.id);
                                    }}
                                />
                            </div>
                        </div>
                    </ListItem>
                )}
            </List>
        );
    },
};

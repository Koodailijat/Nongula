import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar.tsx';
import { useNongulaCalendarState } from './useNongulaCalendarState.tsx';
import { getCellStyle } from '../../../src/routes/dashboardroute/utils/getCellStyle.ts';

const meta: Meta<typeof Calendar> = {
    component: Calendar,
    title: 'Calendar',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [state, locale] = useNongulaCalendarState();
        return (
            <Calendar
                data={{
                    '2025-01-01': [{ id: '1', calories: 150, name: 'Chicken' }],
                    '2025-01-02': [{ id: '2', calories: 260, name: 'Salad' }],
                    '2025-01-03': [{ id: '3', calories: 340, name: 'Burger' }],
                    '2025-01-04': [{ id: '4', calories: 450, name: 'Pizza' }],
                    '2025-01-05': [{ id: '5', calories: 560, name: 'Pasta' }],
                    '2025-01-06': [{ id: '6', calories: 600, name: 'Steak' }],
                    '2025-01-07': [{ id: '7', calories: 750, name: 'Sushi' }],
                    '2025-01-08': [{ id: '8', calories: 850, name: 'Tacos' }],
                    '2025-01-09': [
                        { id: '9', calories: 950, name: 'Burritos' },
                    ],
                    '2025-01-10': [{ id: '0', calories: 1150, name: 'Curry' }],
                    '2025-01-11': [{ id: '11', calories: 1250, name: 'Ramen' }],
                    '2025-01-12': [
                        { id: '12', calories: 1300, name: 'Lasagna' },
                    ],
                    '2025-01-13': [
                        { id: '13', calories: 1400, name: 'Fried Chicken' },
                    ],
                    '2025-01-14': [
                        { id: '13', calories: 1500, name: 'Fish and Chips' },
                    ],
                    '2025-01-15': [{ id: '14', calories: 1650, name: 'BBQ' }],
                    '2025-01-16': [
                        { id: '15', calories: 1750, name: 'Spaghetti' },
                    ],
                    '2025-01-17': [
                        { id: '16', calories: 1800, name: 'Hot Dogs' },
                    ],
                    '2025-01-18': [
                        { id: '17', calories: 1950, name: 'Cheeseburger' },
                    ],
                    '2025-01-19': [
                        { id: '18', calories: 2050, name: 'Fajitas' },
                    ],
                    '2025-01-20': [
                        { id: '19', calories: 2150, name: 'Chicken Wings' },
                    ],
                    '2025-01-21': [
                        { id: '20', calories: 2200, name: 'Peking Duck' },
                    ],
                    '2025-01-22': [
                        { id: '21', calories: 2300, name: 'Shawarma' },
                    ],
                    '2025-01-23': [{ id: '22', calories: 2400, name: 'Chili' }],
                    '2025-01-24': [
                        { id: '23', calories: 2500, name: 'Pork Belly' },
                    ],
                    '2025-01-25': [
                        { id: '24', calories: 2600, name: 'Lobster' },
                    ],
                    '2025-01-26': [{ id: '25', calories: 2700, name: 'Bacon' }],
                    '2025-01-27': [{ id: '26', calories: 2850, name: 'Ribs' }],
                    '2025-01-28': [
                        { id: '27', calories: 2900, name: 'Steak and Fries' },
                    ],
                    '2025-01-29': [
                        { id: '28', calories: 3000, name: 'Paella' },
                    ],
                    '2025-01-30': [
                        { id: '29', calories: 3100, name: 'Casserole' },
                    ],
                }}
                state={state}
                locale={locale.locale}
                targetCalories={2150}
                cellStyleFn={getCellStyle}
            />
        );
    },
};

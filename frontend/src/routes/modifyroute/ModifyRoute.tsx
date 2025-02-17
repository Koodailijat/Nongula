import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { ProgressBar } from '../../../stories/components/ProgressBar/ProgressBar.tsx';
import { Button } from '../../../stories/components/Button/Button.tsx';
import { CustomCaloriesModal } from './components/CustomCaloriesModal.tsx';
import { AddNewFoodModal } from './components/AddNewFoodModal.tsx';
import { Pen, PlusIcon, Trash } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { List } from '../../../stories/components/List/List.tsx';
import { ListItem } from '../../../stories/components/List/ListItem.tsx';
import { IconButton } from '../../../stories/components/IconButton/IconButton.tsx';
import { Text } from '../../../stories/components/Text/Text.tsx';
import { format, isValid } from 'date-fns';
import { useDateParamToDate } from '../../hooks/useDateParamToDate.tsx';
import { ModifyCaloriesModal } from './components/ModifyCaloriesModal.tsx';
import { useNavigate, useParams } from 'react-router';
import { useCurrentDayCalories } from '../../hooks/useCurrentDayCalories.tsx';
import { useFineliQuery } from '../../api/queries/fineliQueries.tsx';
import { SearchBar } from '../../../stories/components/SearchBar/SearchBar.tsx';
import { Key } from 'react-aria-components';
import './modifyroute.scss';
import {
    useFoodDeleteMutation,
    useFoodsQuery,
} from '../../api/queries/foodQueries.tsx';
import { useUserQuery } from '../../api/queries/userQueries.tsx';
import { FoodInputDto } from '../../types/FoodDto.ts';

export function ModifyRoute() {
    const isoDateString = useParams().date;
    const datetime = useDateParamToDate();
    const date = useParams().date!;
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState<
        Omit<FoodInputDto, 'id' | 'date'>
    >({
        calories: 0,
        name: '',
    });
    const [modifyItem, setModifyItem] = useState<Omit<FoodInputDto, 'date'>>({
        id: '',
        calories: 0,
        name: '0',
    });

    // MODALS
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCustomCaloriesModalOpen, setIsCustomCaloriesModalOpen] =
        useState(false);

    // QUERIES
    const foodsQuery = useFoodsQuery({ startDate: date, endDate: date });
    const foodDeleteMutation = useFoodDeleteMutation();
    const fineliQuery = useFineliQuery(search);
    const userQuery = useUserQuery();

    const currentDayCalories = useCurrentDayCalories(
        format(datetime, 'yyyy-MM-dd'),
        foodsQuery.data
    );

    useEffect(() => {
        if (!isValid(datetime)) {
            navigate('/');
            return;
        }
    }, [datetime, isoDateString, navigate]);

    const items = useMemo(
        () =>
            fineliQuery.data
                ? fineliQuery.data.map((item) => ({
                      id: item.id,
                      name: item.name.fi,
                      calories: item.energyKcal,
                  }))
                : [],
        [fineliQuery.data]
    );

    function handleSelection(key: Key | null) {
        const selectedItem = fineliQuery.data
            ? items.filter((item) => item.id === key)[0]
            : null;
        if (selectedItem) {
            setSelectedItem({
                name: selectedItem.name,
                calories: selectedItem.calories,
            });
            setIsAddModalOpen(true);
        }
    }

    function onDelete(id: string) {
        foodDeleteMutation.mutate({ id });
    }

    function onModifyPress(item: Omit<FoodInputDto, 'date'>) {
        setModifyItem(item);
        setIsModifyModalOpen(true);
    }

    const foodItems = useMemo(
        () => (foodsQuery.data ? foodsQuery.data : []),
        [foodsQuery.data]
    );

    return (
        <div className="modify-route">
            <Heading level={1}>{format(datetime, 'LLLL do')}</Heading>
            <div className="modify-route__content">
                <div className="modify-route__progress-bar">
                    <ProgressBar
                        isLoading={userQuery.isPending}
                        label={"Today's calories"}
                        targetValue={Number(userQuery.data?.target_calories)}
                        value={currentDayCalories}
                        valueText={`${currentDayCalories} / ${userQuery.data?.target_calories} kcal`}
                    />
                </div>
                <SearchBar
                    isLoading={fineliQuery.isFetching}
                    onSelectionChange={handleSelection}
                    onInputChange={(value) => setSearch(value)}
                    placeholder="Search"
                    items={items}
                />
                <List
                    className="modify-route__list"
                    items={foodItems}
                    isLoading={foodsQuery.isPending}>
                    {({ calories, name, id }) => (
                        <ListItem
                            className="modify-route__list-item"
                            key={id}
                            id={id}
                            textValue={name}>
                            <div className="modify-route__list-texts">
                                <Text size="large">{name}</Text>
                                <Text size="medium" variant="neutral">
                                    {calories} kcals
                                </Text>
                            </div>
                            <div className="modify-route__list-actions">
                                <IconButton
                                    onPress={() =>
                                        onModifyPress({
                                            id,
                                            name,
                                            calories,
                                        })
                                    }
                                    icon={<Pen strokeWidth={2} />}
                                />
                                <IconButton
                                    icon={<Trash strokeWidth={2} color="red" />}
                                    onPress={() => onDelete(id)}
                                />
                            </div>
                        </ListItem>
                    )}
                </List>
                <Button
                    onPress={() => setIsCustomCaloriesModalOpen(true)}
                    icon={<PlusIcon size="16" />}>
                    Add custom calories
                </Button>
                <CustomCaloriesModal
                    isOpen={isCustomCaloriesModalOpen}
                    setOpen={setIsCustomCaloriesModalOpen}
                />
                <ModifyCaloriesModal
                    item={modifyItem}
                    isOpen={isModifyModalOpen}
                    setOpen={setIsModifyModalOpen}
                />
                <AddNewFoodModal
                    isOpen={isAddModalOpen}
                    setOpen={setIsAddModalOpen}
                    item={selectedItem}
                />
            </div>
        </div>
    );
}

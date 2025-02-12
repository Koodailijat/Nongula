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
import { useNutritionLocalStorage } from '../../hooks/useNutritionLocalStorage.tsx';
import { useTargetCaloriesLocalStorage } from '../../hooks/useTargetCaloriesLocalStorage.tsx';
import { deepClone } from '../../utils/deepclone.ts';
import { ModifyCaloriesModal } from './components/ModifyCaloriesModal.tsx';
import { useNavigate, useParams } from 'react-router';
import { useCurrentDayCalories } from '../../hooks/useCurrentDayCalories.tsx';
import { useFineliQuery } from '../../api/queries/usefineliquery.tsx';
import { SearchBar } from '../../../stories/components/SearchBar/SearchBar.tsx';
import { Item } from '../../types/nutrition.ts';
import { Key } from 'react-aria-components';
import './modifyroute.scss';

export function ModifyRoute() {
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCustomCaloriesOpen, setCustomCaloriesOpen] = useState(false);
    const isoDateString = useParams().date;
    const datetime = useDateParamToDate();
    const dateString = useParams().date!;
    const [nutrition, setNutrition] = useNutritionLocalStorage();
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState<Omit<Item, 'id'>>({
        calories: 0,
        name: '',
    });
    const currentDayCalories = useCurrentDayCalories(dateString, nutrition);

    useEffect(() => {
        if (!isValid(datetime)) {
            navigate('/');
            return;
        }
    }, [datetime, isoDateString, navigate]);

    const { data, isFetching } = useFineliQuery(search);
    const items = useMemo(
        () =>
            data
                ? data.map((item) => ({
                      id: item.id,
                      name: item.name.fi,
                      calories: item.energyKcal,
                  }))
                : [],
        [data]
    );

    function handleSelection(key: Key | null) {
        const selectedItem = data
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

    const [targetCalories] = useTargetCaloriesLocalStorage();

    function onDelete(id: string) {
        const newNutrition = deepClone(nutrition);
        newNutrition[dateString] = newNutrition[dateString].filter(
            (food) => food.id !== id
        );
        setNutrition(newNutrition);
    }

    function onModifyPress(id: string) {
        setId(id);
        setIsModifyModalOpen(true);
    }

    return (
        <div className="modify-route">
            <Heading level={1}>{format(datetime, 'LLLL do')}</Heading>
            <div className="modify-route__content">
                <div className="modify-route__progress-bar">
                    <ProgressBar
                        label={"Today's calories"}
                        targetValue={targetCalories}
                        value={currentDayCalories}
                        valueText={`${currentDayCalories} / ${targetCalories} kcal`}
                    />
                </div>
                <SearchBar
                    isLoading={isFetching}
                    onSelectionChange={handleSelection}
                    onInputChange={(value) => setSearch(value)}
                    placeholder="Search"
                    items={items}
                />
                <List
                    className="modify-route__list"
                    items={nutrition[dateString]}>
                    {({ calories, name, id }) => {
                        if (!id) {
                            return null;
                        }
                        return (
                            <ListItem
                                className="modify-route__list-item"
                                key={id}
                                id={id}
                                textValue={name}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                    <Text size="large">{name}</Text>
                                    <Text size="large">
                                        {calories} calories
                                    </Text>
                                </div>
                                <div className="modify-route__list-actions">
                                    <IconButton
                                        onPress={() => onModifyPress(id)}
                                        icon={<Pen strokeWidth={2} />}
                                    />
                                    <IconButton
                                        icon={
                                            <Trash
                                                strokeWidth={2}
                                                color="red"
                                            />
                                        }
                                        onPress={() => onDelete(id)}
                                    />
                                </div>
                            </ListItem>
                        );
                    }}
                </List>
                <Button
                    onPress={() => setCustomCaloriesOpen(true)}
                    icon={<PlusIcon size="16" />}>
                    Add custom calories
                </Button>
                <CustomCaloriesModal
                    isOpen={isCustomCaloriesOpen}
                    setOpen={setCustomCaloriesOpen}
                />
                <ModifyCaloriesModal
                    foodId={id}
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

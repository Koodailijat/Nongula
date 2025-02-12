import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { ProgressBar } from '../../../stories/components/ProgressBar/ProgressBar.tsx';
import { Button } from '../../../stories/components/Button/Button.tsx';
import { Pen, PlusIcon, SearchIcon, Trash } from 'lucide-react';
import './modifyroute.scss';
import { useEffect, useState } from 'react';
import { TextField } from '../../../stories/components/TextField/TextField.tsx';
import { List } from '../../../stories/components/List/List.tsx';
import { ListItem } from '../../../stories/components/List/ListItem.tsx';
import { IconButton } from '../../../stories/components/IconButton/IconButton.tsx';
import { Text } from '../../../stories/components/Text/Text.tsx';
import { format, isValid } from 'date-fns';
import { deepClone } from '../../utils/deepclone.ts';
import { useNavigate, useParams } from 'react-router';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDateParamToDate } from '../../hooks/useDateParamToDate.tsx';
import { useCurrentDayCalories } from '../../hooks/useCurrentDayCalories.tsx';
import { useTargetCaloriesLocalStorage } from '../../hooks/useTargetCaloriesLocalStorage.tsx';
import { CustomCaloriesModal } from './components/CustomCaloriesModal.tsx';
import { ModifyCaloriesModal } from './components/ModifyCaloriesModal.tsx';
import { AddNewFoodModal } from './components/AddNewFoodModal.tsx';
import { useNutritionLocalStorage } from '../../hooks/useNutritionLocalStorage.tsx';

interface FoodItem {
    id: number;
    name: {
        fi: string;
        en: string;
    };
    energyKcal: number;
}

export function ModifyRoute() {
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isCustomCaloriesOpen, setCustomCaloriesOpen] = useState(false);
    const isoDateString = useParams().date;
    const datetime = useDateParamToDate();
    const dateString = useParams().date!;
    const [nutrition, setNutrition] = useNutritionLocalStorage();
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(0);
    const [selectedItemName, setSelectedItemName] = useState('');
    const currentDayCalories = useCurrentDayCalories(dateString, nutrition);

    useEffect(() => {
        if (!isValid(datetime)) {
            navigate('/');
            return;
        }
    }, [datetime, isoDateString, navigate]);

    async function fetchFoodItems(query: string): Promise<FoodItem[]> {
        const response = await fetch(
            `https://fineli.fi/fineli/api/v1/foods?q=${query}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: FoodItem[] = await response.json();
        return data.slice(0, 5); // Get the first 5 results
    }

    const {
        data: items = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['foodItems', query],
        queryFn: () => fetchFoodItems(query),
        enabled: query.trim() !== '', // Only fetch when query is not empty
        placeholderData: keepPreviousData, // Keep previous data while fetching new data
    });

    function handleIconClick(energyKcal: number, selectedItemName: string) {
        setSelectedItemId(energyKcal); // Set the selected item's id
        setSelectedItemName(selectedItemName);
        setOpen(true); // Open the modal
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
                <TextField
                    aria-label={'Search'}
                    iconSide={'left'}
                    icon={<SearchIcon />}
                    placeholder={'Search'}
                    value={query}
                    onChange={(value) => setQuery(value)}
                />
                {/* List component to display results */}
                {isLoading && <Text>Loading...</Text>}
                {isError && <Text>Error fetching data.</Text>}
                {items.length > 0 && (
                    <div className="search-results">
                        <List className="food-list" items={items}>
                            {({ id, name, energyKcal }) => (
                                <ListItem
                                    className="modify-route__list-item"
                                    key={id}
                                    id={id}
                                    textValue={name.fi}>
                                    <Text>{name.fi}</Text>
                                    <div className="modify-route__list-actions">
                                        <IconButton
                                            icon={
                                                <PlusIcon
                                                    strokeWidth={2}
                                                    color="green"
                                                />
                                            }
                                            onPress={() => {
                                                handleIconClick(
                                                    energyKcal,
                                                    name.fi
                                                );
                                            }}
                                        />
                                    </div>
                                </ListItem>
                            )}
                        </List>
                    </div>
                )}
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
                    isOpen={isOpen}
                    setOpen={setOpen}
                    itemId={selectedItemId}
                    name={selectedItemName}
                />
            </div>
        </div>
    );
}

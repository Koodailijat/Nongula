import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { useNutritionLocalStorage } from '../../../hooks/useNutritionLocalStorage.tsx';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { deepClone } from '../../../utils/deepclone.ts';
import { Item } from '../../../types/nutrition.ts';

interface AddNewFoodModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    item: Omit<Item, 'id'>;
}

export function AddNewFoodModal({
    isOpen,
    setOpen,
    item,
}: AddNewFoodModalProps) {
    function onChange(nextValue: boolean) {
        setOpen(nextValue);
    }

    const [weight, setWeight] = useState(0);
    const datetime = useParams().date!;
    const [totalCalories, setTotalCalories] = useState(0);
    const [nutrition, setNutrition] = useNutritionLocalStorage();
    const [kcal, setKcal] = useState(0);

    const [foodName, setFoodName] = useState(item.name);

    useEffect(() => {
        setFoodName(item.name);
    }, [item.name]);

    useEffect(() => {
        setKcal(Math.round(item.calories));
    }, [item.calories]);

    function onAdd() {
        const newCalories = deepClone(nutrition);
        const caloriesValue =
            totalCalories === 0 ? kcal * (weight / 100) : totalCalories;
        newCalories[datetime] = newCalories[datetime] || [];

        const newNutritionValue = {
            calories: Math.round(caloriesValue),
            name: foodName,
            id: crypto.randomUUID(),
        };
        newCalories[datetime].push(newNutritionValue);

        setTotalCalories(0);
        setNutrition(newCalories);
        setOpen(false);
    }

    return (
        <Modal ariaLabel="AddNewFoodModal" isOpen={isOpen} onChange={onChange}>
            <div className="custom-modal">
                <Heading level={2}>Add chosen food</Heading>
                <TextField
                    isRequired={true}
                    label="Food name"
                    placeholder="Food name"
                    onChange={setFoodName}
                    value={foodName}
                />
                <>
                    <TextField
                        label="Calories (Kcal / 100g)"
                        placeholder="Calories (Kcal / 100g)"
                        onChange={(value) => setKcal(Number(value))}
                        isDisabled={true}
                        value={kcal.toString()}
                    />
                    <TextField
                        label="Weight (g)"
                        placeholder="Weight (g)"
                        onChange={(value) => setWeight(Number(value))}
                    />
                </>
                <div className="custom-modal__actions">
                    <Button
                        onPress={onAdd}
                        icon={<PlusIcon color="white" size="16" />}>
                        Add
                    </Button>
                    <Button variant="danger" onPress={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

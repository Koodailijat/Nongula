import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { deepClone } from '../../../utils/deepclone.ts';
import { useNutritionLocalStorage } from '../../../hooks/useNutritionLocalStorage.tsx';

interface AddNewFoodModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    itemId: number;
    name: string;
}

export function AddNewFoodModal({
    isOpen,
    setOpen,
    name,
    itemId,
}: AddNewFoodModalProps) {
    function onChange(nextValue: boolean) {
        setOpen(nextValue);
    }

    const [weight, setWeight] = useState(0);
    const datetime = useParams().date!;
    const [totalCalories, setTotalCalories] = useState(0);
    const [calories, setCalories] = useNutritionLocalStorage();
    const [kcal, setKcal] = useState(0);

    const [foodName, setFoodName] = useState(name);

    useEffect(() => {
        setFoodName(name);
    }, [name]);

    useEffect(() => {
        setKcal(Math.round(itemId));
    }, [itemId]);

    function onAdd() {
        const newCalories = deepClone(calories);
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
        setCalories(newCalories);
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

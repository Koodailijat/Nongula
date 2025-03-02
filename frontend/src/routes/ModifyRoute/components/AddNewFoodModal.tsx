import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { PlusIcon } from 'lucide-react';
import { useParams } from 'react-router';
import { useFoodMutation } from '../../../api/queries/foodQueries.tsx';
import { FoodInputDto } from '../../../types/FoodDto.ts';
import { useIsDesktopMode } from '../../../hooks/useIsDesktopMode.tsx';

interface AddNewFoodModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    item: Omit<FoodInputDto, 'id' | 'date'>;
}

export function AddNewFoodModal({
    isOpen,
    setOpen,
    item,
}: AddNewFoodModalProps) {
    const isDesktopMode = useIsDesktopMode();
    const date = useParams().date!;
    const [calories, setCalories] = useState(item.calories.toString());
    const [weight, setWeight] = useState('100');
    const [name, setName] = useState(item.name);

    const foodMutation = useFoodMutation();

    useEffect(() => {
        setName(item.name);
    }, [item.name]);

    useEffect(() => {
        setCalories(Math.round(item.calories).toString());
    }, [item.calories]);

    function onChange(nextValue: boolean) {
        setOpen(nextValue);
    }

    function handleAdd() {
        const calculatedCalories = Number(calories) * (Number(weight) / 100);

        foodMutation.mutate({
            name,
            calories: calculatedCalories,
            date,
        });

        setWeight('100');
        setOpen(false);
    }

    return (
        <Modal
            aria-label="Add new food modal"
            isOpen={isOpen}
            onChange={onChange}
            size={isDesktopMode ? 'medium' : 'small'}>
            <div className="custom-modal">
                <Heading level={2}>Add chosen food</Heading>
                <TextField
                    isRequired={true}
                    label="Food name"
                    placeholder="Food name"
                    onChange={setName}
                    value={name}
                />
                <>
                    <TextField
                        isNumberField={true}
                        label="Calories (Kcal / 100g)"
                        placeholder="Calories (Kcal / 100g)"
                        onChange={(value) => setCalories(value)}
                        value={calories}
                    />
                    <TextField
                        isNumberField={true}
                        label="Weight (g)"
                        placeholder="Weight (g)"
                        value={weight}
                        onChange={(value) => setWeight(value)}
                    />
                </>
                <div className="custom-modal__actions">
                    <Button
                        onPress={handleAdd}
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

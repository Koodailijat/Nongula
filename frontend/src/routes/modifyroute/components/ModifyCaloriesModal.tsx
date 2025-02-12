import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import './customcaloriesmodal.scss';
import { useParams } from 'react-router';
import { deepClone } from '../../../utils/deepclone.ts';
import { useNutritionLocalStorage } from '../../../hooks/useNutritionLocalStorage.tsx';

interface ModifyCaloriesModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    foodId: string;
}

export function ModifyCaloriesModal({
    isOpen,
    setOpen,
    foodId,
}: ModifyCaloriesModalProps) {
    const [calories, setCalories] = useNutritionLocalStorage();
    const [name, setName] = useState('');
    const [caloriesValue, setCaloriesValue] = useState(0);
    const datetime = useParams().date!;

    useEffect(() => {
        const newCalories = deepClone(calories);
        if (newCalories[datetime]) {
            const modifiedNutrition = newCalories[datetime].find(
                (food) => food.id === foodId
            );

            if (modifiedNutrition) {
                setName(modifiedNutrition.name);
                setCaloriesValue(modifiedNutrition.calories);
            }
        }
    }, [calories, datetime, foodId]);

    function onChange(nextValue: boolean) {
        setOpen(nextValue);
    }

    function onUpdate() {
        const modifiedCalories = deepClone(calories);

        if (modifiedCalories[datetime]) {
            modifiedCalories[datetime] = modifiedCalories[datetime].map(
                (foodItem) => {
                    if (foodId === foodItem.id) {
                        return {
                            ...foodItem,
                            name: name.trim(),
                            calories: caloriesValue,
                        };
                    }
                    return foodItem;
                }
            );
            setCalories(modifiedCalories);
        } else {
            modifiedCalories[datetime] = [
                { id: foodId, name: name.trim(), calories: caloriesValue },
            ];
            setCalories(modifiedCalories);
        }
        setOpen(false);
    }

    return (
        <Modal
            ariaLabel="Edit calories"
            isOpen={isOpen}
            onChange={onChange}
            aria-label="Edit calories modal">
            <div className="modify-modal" aria-label="Edit calories modal">
                <Heading level={2} slot="title">
                    Edit calories
                </Heading>
                <div className="modify-modal__content">
                    <TextField
                        value={name}
                        onChange={setName}
                        isRequired={true}
                        label="Food name"
                        placeholder="Food name"
                    />
                    <TextField
                        value={caloriesValue.toString()}
                        onChange={(text) => setCaloriesValue(Number(text))}
                        label={'Total calories'}
                        placeholder={'Input calories'}
                    />
                </div>
                <div className="modify-modal__actions">
                    <Button
                        onPress={onUpdate}
                        icon={<RefreshCw color="white" size="16" />}>
                        Update
                    </Button>
                    <Button variant="danger" onPress={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

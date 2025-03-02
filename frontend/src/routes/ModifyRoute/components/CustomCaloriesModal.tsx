import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { SegmentedControl } from '../../../../stories/components/SegmentedControl/SegmentedControl.tsx';
import { Dispatch, SetStateAction, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import './customcaloriesmodal.scss';
import { useParams } from 'react-router';
import { useFoodMutation } from '../../../api/queries/foodQueries.tsx';

interface CustomCaloriesModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export function CustomCaloriesModal({
    isOpen,
    setOpen,
}: CustomCaloriesModalProps) {
    const [selectedSegment, setSelectedSegment] = useState(0);
    const [totalCalories, setTotalCalories] = useState('0');
    const [calories, setCalories] = useState('0');
    const [weight, setWeight] = useState('0');
    const [foodName, setFoodName] = useState('');
    const foodMutation = useFoodMutation();
    const datetime = useParams().date!;

    function onChange(nextValue: boolean) {
        setOpen(nextValue);
    }

    function onAdd() {
        const calculatedCalories =
            selectedSegment === 0
                ? Number(totalCalories)
                : Number(calories) * (Number(weight) / 100);

        foodMutation.mutate({
            calories: calculatedCalories,
            name: foodName,
            date: datetime,
        });
        setOpen(false);
    }

    return (
        <Modal
            aria-label="Custom calories modal"
            isOpen={isOpen}
            onChange={onChange}>
            <div className="custom-modal" aria-label="Custom calories modal">
                <Heading level={2} slot="title">
                    Custom calories
                </Heading>
                <div className="custom-modal__content">
                    <TextField
                        isRequired={true}
                        label="Food name"
                        placeholder="Food name"
                        onChange={setFoodName}
                    />
                    <SegmentedControl
                        selected={selectedSegment}
                        setSelected={setSelectedSegment}
                        segments={['Total', 'Kcal / g']}
                    />
                    {selectedSegment === 0 ? (
                        <TextField
                            label="Total calories"
                            placeholder="Total calories"
                            isNumberField={true}
                            onChange={(value) => setTotalCalories(value)}
                        />
                    ) : (
                        <>
                            <TextField
                                label="Calories (Kcal / 100g)"
                                placeholder="Calories (Kcal / 100g)"
                                value={calories}
                                isNumberField={true}
                                onChange={(value) => setCalories(value)}
                            />
                            <TextField
                                label="Weight (g)"
                                placeholder="Weight (g)"
                                isNumberField={true}
                                onChange={(value) => setWeight(value)}
                            />
                        </>
                    )}
                </div>
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

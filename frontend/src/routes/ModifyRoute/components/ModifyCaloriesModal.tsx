import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import './customcaloriesmodal.scss';
import { useFoodModifyMutation } from '../../../api/queries/foodQueries.tsx';
import { FoodInputDto } from '../../../types/FoodDto.ts';
import { useMediaQuery } from 'usehooks-ts';

interface ModifyCaloriesModalProps {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    item: Omit<FoodInputDto, 'date'>;
}

export function ModifyCaloriesModal({
    isOpen,
    setOpen,
    item,
}: ModifyCaloriesModalProps) {
    const isDesktopMode = useMediaQuery('(min-width: 500px)');
    const [name, setName] = useState(item.name);
    const [calories, setCalories] = useState(item.calories.toString());

    useEffect(() => {
        setName(item.name);
    }, [item.name]);

    useEffect(() => {
        setCalories(item.calories.toString());
    }, [item.calories]);

    const foodModifyMutation = useFoodModifyMutation();
    function onChange(nextValue: boolean) {
        setOpen(nextValue);
    }

    function onUpdate() {
        foodModifyMutation.mutate({
            id: item.id,
            calories: Number(calories),
            name: name.trim(),
        });
        setOpen(false);
    }

    return (
        <Modal
            aria-label="Edit calories modal"
            isOpen={isOpen}
            onChange={onChange}
            size={isDesktopMode ? 'medium' : 'small'}>
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
                        value={calories}
                        onChange={(text) => setCalories(text)}
                        label={'Total calories'}
                        isNumberField={true}
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

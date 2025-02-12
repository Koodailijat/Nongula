import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { RefreshCw } from 'lucide-react';
import { useTargetCaloriesLocalStorage } from '../../../hooks/useTargetCaloriesLocalStorage.tsx';

interface ChangeTargetCaloriesModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ChangeTargetCaloriesModal({
    isOpen,
    setIsOpen,
}: ChangeTargetCaloriesModalProps) {
    const [value, setValue] = useState('');
    const [targetCalories, setTargetCalories] = useTargetCaloriesLocalStorage();

    useEffect(() => {
        setValue(targetCalories.toString());
    }, [targetCalories]);

    function onChange(nextValue: boolean) {
        setIsOpen(nextValue);
    }

    function handleSubmit() {
        if (Number(value) > 0) {
            setTargetCalories(Number(value));
            setIsOpen(false);
        }
    }

    return (
        <Modal ariaLabel="Default modal" isOpen={isOpen} onChange={onChange}>
            <div className="target-modal">
                <Heading level={2} slot="title">
                    Change target
                </Heading>
                <TextField
                    value={value}
                    onChange={setValue}
                    label={'Target calories'}
                    placeholder={'Target calories'}
                />
                <div className="target-modal__buttons">
                    <Button
                        onPress={handleSubmit}
                        icon={<RefreshCw color="white" size="16" />}>
                        Update
                    </Button>
                    <Button variant="danger" onPress={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

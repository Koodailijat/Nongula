import { Modal } from '../../../../stories/components/Modal/Modal.tsx';
import { Heading } from '../../../../stories/components/Heading/Heading.tsx';
import { TextField } from '../../../../stories/components/TextField/TextField.tsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../../../stories/components/Button/Button.tsx';
import { RefreshCw } from 'lucide-react';
import { toastQueue } from '../../../../stories/components/Toast/GlobalToastRegion.tsx';
import {
    useUserMutation,
    useUserQuery,
} from '../../../api/queries/userQueries.tsx';

interface ChangeTargetCaloriesModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ChangeTargetCaloriesModal({
    isOpen,
    setIsOpen,
}: ChangeTargetCaloriesModalProps) {
    const { data } = useUserQuery();
    const userMutation = useUserMutation();
    const [targetCalories, setTargetCalories] = useState('');

    useEffect(() => {
        if (data) {
            setTargetCalories(data.target_calories_min.toString());
        }
    }, [data]);

    function onChange(nextValue: boolean) {
        setIsOpen(nextValue);
    }

    function handleSubmit() {
        if (Number(targetCalories) > 0) {
            userMutation.mutate(
                {
                    target_calories_min: Number(targetCalories),
                },
                {
                    onSuccess: () => {
                        setIsOpen(false);
                        toastQueue.add(
                            {
                                element: `Target calories updated!`,
                                severity: 'success',
                            },
                            { timeout: 5000 }
                        );
                    },
                }
            );
        }
    }

    return (
        <Modal aria-label="Default modal" isOpen={isOpen} onChange={onChange}>
            <div className="target-modal">
                <Heading level={2} slot="title">
                    Change target
                </Heading>
                <TextField
                    isNumberField={true}
                    value={targetCalories}
                    onChange={setTargetCalories}
                    label={'Target calories'}
                    placeholder={'Target calories'}
                    isDisabled={userMutation.isPending}
                />
                <div className="target-modal__buttons">
                    <Button
                        isPending={userMutation.isPending}
                        onPress={handleSubmit}
                        icon={<RefreshCw color="white" size="16" />}>
                        Update
                    </Button>
                    <Button
                        isPending={userMutation.isPending}
                        variant="danger"
                        onPress={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

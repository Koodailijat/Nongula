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
import { useNavigate } from 'react-router';
import { useIsDesktopMode } from '../../../hooks/useIsDesktopMode.tsx';

interface ChangeTargetCaloriesModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ChangeTargetCaloriesModal({
    isOpen,
    setIsOpen,
}: ChangeTargetCaloriesModalProps) {
    const navigate = useNavigate();
    const { data } = useUserQuery();
    const userMutation = useUserMutation();
    const isDesktopMode = useIsDesktopMode();
    const [targetCaloriesMin, setTargetCaloriesMin] = useState('');
    const [targetCaloriesMax, setTargetCaloriesMax] = useState('');

    useEffect(() => {
        if (data?.target_calories_min) {
            setTargetCaloriesMin(data.target_calories_min.toString());
        }
        if (data?.target_calories_max) {
            setTargetCaloriesMax(data.target_calories_max.toString());
        }
    }, [data]);

    function onChange(nextValue: boolean) {
        setIsOpen(nextValue);
    }

    function handleSubmit() {
        if (Number(targetCaloriesMin) > 0) {
            userMutation.mutate(
                {
                    target_calories_min: Number(targetCaloriesMin),
                    target_calories_max: Number(targetCaloriesMax),
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
        <Modal
            aria-label="Default modal"
            isOpen={isOpen}
            onChange={onChange}
            size={isDesktopMode ? 'medium' : 'small'}>
            <div className="target-modal">
                <Heading level={2} slot="title">
                    Change targets
                </Heading>
                <TextField
                    value={targetCaloriesMin}
                    onChange={setTargetCaloriesMin}
                    label={'Minimum target calories'}
                    isNumberField={true}
                    placeholder={'Minimum target calories'}
                    isDisabled={userMutation.isPending}
                />
                <TextField
                    value={targetCaloriesMax}
                    onChange={setTargetCaloriesMax}
                    label={'Max target calories'}
                    isNumberField={true}
                    placeholder={'Max target calories'}
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
                        onPress={() => navigate('/setup')}
                        variant="secondary">
                        Setup
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

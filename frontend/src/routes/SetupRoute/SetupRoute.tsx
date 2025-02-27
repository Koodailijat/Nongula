import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { TextField } from '../../../stories/components/TextField/TextField.tsx';
import { Dropdown } from '../../../stories/components/Dropdown/Dropdown.tsx';
import { Button } from '../../../stories/components/Button/Button.tsx';
import { Form } from 'react-aria-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetupSchema } from '../../lib/schemas/SetupSchema.ts';
import { SetupInputDto } from '../../types/SetupDto.ts';
import { useSetupMutation } from '../../api/queries/setupQueries.tsx';
import { toastQueue } from '../../../stories/components/Toast/GlobalToastRegion.tsx';
import { useNavigate } from 'react-router';

export function SetupRoute() {
    const {
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SetupInputDto>({
        resolver: zodResolver(SetupSchema),
        mode: 'onSubmit',
    });
    const setupMutation = useSetupMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SetupInputDto> = (data: SetupInputDto) => {
        setupMutation.mutate(
            { ...data },
            {
                onSuccess: () => {
                    navigate('/dashboard');
                },
                onError: (error) => {
                    toastQueue.add(
                        { element: `Error: ${error}`, severity: 'danger' },
                        { timeout: 5000 }
                    );
                },
            }
        );
    };

    return (
        <div className="setup">
            <div className="setup__header">
                <Heading level={1}>Setup route</Heading>
            </div>
            <Form className="setup__content" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Age"
                    isRequired
                    onChange={(value) => setValue('age', Number(value))}
                    errorText={errors.age?.message}
                />
                <Dropdown
                    placeholder="Gender"
                    onSelectionChange={(value) =>
                        setValue('gender', value.toString())
                    }
                    label="Gender"
                    items={[
                        { id: 'female', name: 'Female' },
                        { id: 'male', name: 'Male' },
                    ]}
                />
                <Dropdown
                    placeholder="Activity level"
                    onSelectionChange={(value) =>
                        setValue('activity_level', Number(value))
                    }
                    label="Activity level"
                    items={[
                        { id: 1, name: 'Not active' },
                        { id: 2, name: 'Moderately active' },
                        { id: 3, name: 'Active' },
                    ]}
                />
                <Button type="submit">Login</Button>
            </Form>
        </div>
    );
}

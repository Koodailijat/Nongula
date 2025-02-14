import { Button } from '../../../stories/components/Button/Button.tsx';
import { useSignUpMutation } from '../../api/queries/authQueries.tsx';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'react-aria-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '../../lib/schemas/SignUpSchema.ts';
import { SignUpInputDto } from '../../types/SignUpDto.ts';
import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { Lock, User } from 'lucide-react';
import { TextField } from '../../../stories/components/TextField/TextField.tsx';

export function SignUpRoute() {
    const navigate = useNavigate();
    const signUpMutation = useSignUpMutation();
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<SignUpInputDto>({
        resolver: zodResolver(SignUpSchema),
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<SignUpInputDto> = (data: SignUpInputDto) => {
        signUpMutation.mutate(
            { ...data },
            { onSuccess: () => navigate('/login') }
        );
        // TODO: Show toast on error
    };

    return (
        <Form className="signupform" onSubmit={handleSubmit(onSubmit)}>
            <Heading level={1}>Sign up</Heading>
            <TextField
                placeholder="email"
                icon={<User />}
                type="email"
                label="Email"
                {...register('email')}
                errorText={errors.email?.message}
                onChange={(email) => setValue('email', email)}
            />
            <TextField
                placeholder="Password"
                icon={<Lock />}
                type="password"
                label="Password"
                {...register('password')}
                errorText={errors.password?.message}
                onChange={(password) => setValue('password', password)}
            />
            <TextField
                placeholder="Confirm password"
                icon={<Lock />}
                type="password"
                label="Confirm password"
                {...register('confirmPassword')}
                errorText={errors.confirmPassword?.message}
                onChange={(confirmPassword) =>
                    setValue('confirmPassword', confirmPassword)
                }
            />
            <Button type="submit">Sign Up</Button>
        </Form>
    );
}

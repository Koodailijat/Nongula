import { Button } from '../../../stories/components/Button/Button.tsx';
import { useNavigate } from 'react-router';
import { Heading } from '../../../stories/components/Heading/Heading.tsx';

export function RootRoute() {
    const navigate = useNavigate();

    return (
        <div className="root-route">
            <Heading level={1}>Welcome to Nongula!</Heading>
            <div className="root-route__actions">
                <Button onPress={() => navigate('/login')}>Login</Button>
                <Button onPress={() => navigate('/signup')}>Sign up</Button>
            </div>
        </div>
    );
}

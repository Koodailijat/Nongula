import { useNavigate } from 'react-router';
import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { Button } from '../../../stories/components/Button/Button.tsx';
import { ArrowLeft } from 'lucide-react';
import './errorroute.scss';

export function ErrorRoute() {
    const navigate = useNavigate();
    return (
        <div className="error-route">
            <div className="error-route__content">
                <Heading level={2}>Something went wrong 🤔</Heading>
                <Button onPress={() => navigate(-1)} icon={<ArrowLeft />}>
                    Go back to previous page
                </Button>
            </div>
        </div>
    );
}

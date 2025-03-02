import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router';
import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { Button } from '../../../stories/components/Button/Button.tsx';
import { Text } from '../../../stories/components/Text/Text.tsx';
import { Scene } from './components/Scene.tsx';
import { TopNavigation } from '../../components/TopNavigation.tsx';
import { useIsDesktopMode } from '../../hooks/useIsDesktopMode.tsx';

export function RootRoute() {
    const navigate = useNavigate();
    const isDesktopMode = useIsDesktopMode();
    return (
        <div className="root-route__container">
            <TopNavigation className="root-route__header">
                <Heading className="root-route__top-heading" level={1}>
                    Nongula
                </Heading>
                <div />
                <div className="root-route__header-buttons">
                    <Button onPress={() => navigate('/signup')}>Signup</Button>
                    <Button
                        onPress={() => navigate('/login')}
                        variant={'secondary'}>
                        Login
                    </Button>
                </div>
            </TopNavigation>
            <div className="root-route__page">
                <div className="root-route__main-content">
                    <Canvas
                        style={{
                            height: isDesktopMode ? '425px' : '250px',
                            width: '100%',
                        }}>
                        <Scene />
                    </Canvas>
                    <div className="root-route__content-wrapper">
                        <Heading level={1} className="root-route__heading">
                            Support tool for your new lifestyle
                        </Heading>
                        <Text className="root-route__text">
                            Easily track your meals, set calorie goals, and stay
                            on top of your nutrition every day with our app.
                        </Text>
                        <Button onPress={() => navigate('/signup')}>
                            Get started
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

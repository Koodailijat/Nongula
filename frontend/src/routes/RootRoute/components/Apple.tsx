import { Group, Object3D } from 'three';
import { forwardRef } from 'react';

interface AppleProps {
    scene: Group;
}

// eslint-disable-next-line react/display-name
export const Apple = forwardRef<Object3D, AppleProps>(({ scene }, ref) => {
    scene.scale.set(0.05, 0.05, 0.05);
    scene.rotation.x = 0.6;
    scene.position.set(0, -1.5, 0);
    return <primitive object={scene} ref={ref}></primitive>;
});

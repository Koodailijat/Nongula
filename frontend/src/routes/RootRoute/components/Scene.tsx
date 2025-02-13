import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useRef } from 'react';
import { Mesh } from 'three';
import { Apple } from './Apple.tsx';

export function Scene() {
    const gltf = useLoader(GLTFLoader, './apple/scene.gltf');

    const ref = useRef<Mesh>(null);
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta;
        }
    });

    return (
        <>
            <pointLight position={[6, 3, 10]} color={0xffff00} intensity={20} />
            <pointLight color={0xffa500} intensity={2} />
            <ambientLight color={0xffffff} intensity={1} />
            <Apple scene={gltf.scene} ref={ref} />
        </>
    );
}

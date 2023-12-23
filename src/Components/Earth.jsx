import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, Stats } from "@react-three/drei";
import { TextureLoader } from "three";

import CanvasLoader from "./CanvasLoader";

const Earth = () => {
    const earthTexture = useLoader(TextureLoader, "/EarthTexture.jpg");

    return (
        <mesh>
            <sphereGeometry args={[1, 64, 64]} attach="geometry"/>
            <meshBasicMaterial map={earthTexture} />
        </mesh>
    );
};

export default function EarthCanva() {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <Earth />
            </Suspense>

            <Preload all />
            <OrbitControls 
                autoRotate
                enablePan={false}
            />
            <Stats />
        </Canvas>
    );
}

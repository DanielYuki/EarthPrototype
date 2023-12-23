import { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Stats } from "@react-three/drei";
import { TextureLoader, MeshPhysicalMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import CanvasLoader from "./CanvasLoader";

import earthVertexShader from "../assets/Shaders/earthVertex.glsl";
import earthFragmentShader from "../assets/Shaders/earthFragment.glsl";
import atmosphereVertexShader from "../assets/Shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../assets/Shaders/atmosphereFragment.glsl";

const Earth = () => {
    const earthTexture = useLoader(TextureLoader, "/EarthTexture.jpg");

    return (
        <mesh>
            <sphereGeometry args={[1, 64, 64]} attach="geometry" />

            <shaderMaterial 
                attach="material"
                vertexShader={earthVertexShader}
                fragmentShader={earthFragmentShader}
                uniforms={{
                    uTexture: { value: earthTexture },
                }}
                lights={false}
            />

            {/* <CustomShaderMaterial
                baseMaterial={MeshPhysicalMaterial}
                vertexShader={earthVertexShader}
                fragmentShader={earthFragmentShader}
                uniforms={{
                    uTexture: { value: earthTexture },
                }}
                roughness={0.95}
                metalness={0.25}
                // silent
            /> */}
        </mesh>
    );
};

const Atmosphere = () => {
    return (
        <mesh>
            <sphereGeometry args={[1.25, 32, 32]} attach="geometry" />
            <shaderMaterial
                vertexShader={atmosphereVertexShader}
                fragmentShader={atmosphereFragmentShader}
                blending={2}
                side={1}
            />
        </mesh>
    );
};

export default function EarthCanva() {
    return (
        <Canvas
            // frameloop="demand"
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                {/* <ambientLight intensity={0.1} color={[0.6, 0.8, 1]} />
                <directionalLight
                    castShadow
                    position={[100, 0, 100]}
                    intensity={2.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    color={[0.75, 0.8, 1]}
                /> */}
                <Earth />
                <Atmosphere />
            </Suspense>

            <Preload all />
            <OrbitControls
                autoRotate
                autoRotateSpeed={0.75}
                enablePan={false}
                maxPolarAngle={(Math.PI * 2) / 3}
                minPolarAngle={Math.PI / 3}
            />
            <Stats />
        </Canvas>
    );
}

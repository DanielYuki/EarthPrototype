import { Suspense, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Stats } from "@react-three/drei";
import { TextureLoader, MeshPhysicalMaterial, AxesHelper } from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import { gsap } from "gsap";

import CanvasLoader from "./CanvasLoader";

import earthVertexShader from "../assets/Shaders/earthVertex.glsl";
import earthFragmentShader from "../assets/Shaders/earthFragment.glsl";
import atmosphereVertexShader from "../assets/Shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../assets/Shaders/atmosphereFragment.glsl";

const Earth = () => {
    const earthTexture = useLoader(TextureLoader, "/EarthTexture.jpg");
    const earthBumpMap = useLoader(TextureLoader, "/EarthBumpMap.jpg");
    const earthTextureNight = useLoader(TextureLoader, "/EarthTextureNight.jpg");
    const oceanMap = useLoader(TextureLoader, "/OceanMapV3.jpg");

    const earthRef = useRef();
    const groupRef = useRef();
    
    const tiltAngle = -(23.5 * (Math.PI / 180));
    
    const mouseCoords = {
        x: 0,
        y: 0,
    };
    
    addEventListener("mousemove", (e) => {
        mouseCoords.x = (e.clientX / innerWidth) * 2 - 1;
        mouseCoords.y = -(e.clientY / innerHeight) * 2 + 1;
    });
    
    useFrame((state, delta) => {
        earthRef.current.rotation.y += delta / 10;
        
        const elapsedTime = state.clock.getElapsedTime();
        earthRef.current.rotation.x =
        tiltAngle * Math.sin(elapsedTime / 10) * 0.8;
        
        gsap.to(groupRef.current.rotation, {
            y: mouseCoords.x * 0.3,
            x: -mouseCoords.y * 0.2,
            duration: 2,
        });
    });
    
    return (
        <group ref={groupRef}>
            <mesh ref={earthRef}
                castShadow
                >
                {/* <axesHelper args={[2]} /> */}
                <sphereGeometry args={[1, 64, 64]} attach="geometry" />

                {/* <shaderMaterial
                    attach="material"
                    vertexShader={earthVertexShader}
                    fragmentShader={earthFragmentShader}
                    uniforms={{
                        uTexture: { value: earthTexture },
                    }}
                    lights={false}
                /> */}

                <CustomShaderMaterial
                    baseMaterial={MeshPhysicalMaterial}
                    vertexShader={earthVertexShader}
                    fragmentShader={earthFragmentShader}
                    uniforms={{
                        uTexture: { value: earthTexture },
                    }}
                    silent
                    bumpMap={earthBumpMap}
                    bumpScale={2}
                    roughnessMap={oceanMap}
                    // roughness={0.5}
                    metalnessMap={oceanMap}
                    metalness={0.25}
                    emissiveMap={earthTextureNight}
                    emissive={0xffff88}
                    emissiveIntensity={.35}
                    />
            </mesh>
            <Clouds />
        </group>
    );
};

const Clouds = () => {
    const cloudsTexture = useLoader(TextureLoader, "/CloudMap.jpg");
    const cloudsRef = useRef();

    useFrame((state, delta) => {
        cloudsRef.current.rotation.y += delta / 8.5;
    });
    
    return (
        <mesh ref={cloudsRef}>
            <sphereGeometry args={[1.01, 64, 64]} attach="geometry" />
            <meshStandardMaterial
                attach="material"
                transparent
                opacity={0.25}
                depthWrite={false}
                map={cloudsTexture}
                blending={2}
            />
        </mesh>
    );
}

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
                <ambientLight intensity={0.15} color={[0.6, 0.8, 1]} />
                <directionalLight
                    position={[100, 0, 100]}
                    intensity={2.5}
                    color={[0.8, 0.8, 1]}
                    // castShadow
                    // shadow-mapSize-width={1024}
                    // shadow-mapSize-height={1024}
                />
                <Earth />
                <Atmosphere />
            </Suspense>

            <Preload all />
            <OrbitControls
                // autoRotate
                // autoRotateSpeed={0.75}
                enablePan={false}
                maxPolarAngle={(Math.PI * 2) / 3}
                minPolarAngle={Math.PI / 3}
            />
            {/* <Stats /> */}
        </Canvas>
    );
}

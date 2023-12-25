import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Sun = () => {
    const sunTexture = useLoader(TextureLoader, "/SunTexture.jpg");

    return (
        <group position={[100,0,100]}>
            <pointLight
                position={[0, 0, 0]}
                intensity={35000}
                color={[0.8, 0.8, 1]}
            />
            <mesh>
                <sphereGeometry args={[1, 32, 32]} attach="geometry" />
                <meshBasicMaterial color="yellow" map={sunTexture}/>
            </mesh>
        </group>
    );
};

export default Sun;

import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, Points, PointMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { useControls, button, Leva } from "leva";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
    const ref = useRef();

    const [{ starBoxSize, stride, starSize }, set] = useControls(
        "Stars",
        () => ({
            starBoxSize: {
                value: 2,
                min: 0,
                max: 5,
                step: 0.1,
            },
            stride: {
                value: 3,
                min: 0,
                max: 10,
                step: 0.2,
            },
            starSize: {
                value: 0.0025,
                min: 0.0005,
                max: 0.01,
                step: 0.0005,
            },
            reset: button(() => {
                set({
                    starBoxSize: 2,
                    stride: 3,
                    starSize: 0.0025,
                });
            }),
        })
    );

    const sphere = random.inSphere(new Float32Array(10000), {
        radius: starBoxSize,
    });

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 150;
        ref.current.rotation.y -= delta / 175;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={stride}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={starSize}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

export default function StarsCanva() {
    return (
        <>
            <Leva collapsed={true} hidden={false} />
            <div className="h-auto w-full absolute inset-0 z-[-1]">
                <Canvas camera={{ position: [0, 0, 1.15] }}>
                    <Suspense fallback={null}>
                        <Stars />
                    </Suspense>

                    <Preload all />
                </Canvas>
            </div>
        </>
    );
}

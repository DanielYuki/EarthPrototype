import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import { useControls, button } from "leva";

const StarsObj = () => {
    const ref = useRef();

    const [{ radius, depth, count, factor, saturation, fade }, set] = useControls("Stars", () => ({
            radius: {
                value: 100,
                min: 0,
                max: 500,
                step: 10,
            },
            depth: {
                value: 50,
                min: 0,
                max: 150,
                step: 5,
            },
            count: {
                value: 2000,
                min: 0,
                max: 10000,
                step: 10,
            },
            factor: {
                value: 4,
                min: 0,
                max: 10,
                step: 1,
            },
            saturation: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
            },
            fade: {
                value: true,
            },
            reset: button(() => {
                set({
                    radius: 100,
                    depth: 50,
                    count: 2000,
                    factor: 4,
                    saturation: 0,
                    fade: true,
                });
            }),
        }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 150;
        ref.current.rotation.y -= delta / 150;
    });

    return (
        <Stars
            ref={ref}
            radius={radius} // Radius of the inner sphere (default=100)
            depth={depth} // Depth of area where stars should fit (default=50)
            count={count} // Amount of stars (default=2000)
            factor={factor} // Size factor (default=4)
            saturation={saturation} // Saturation 0-1 (default=0)
            fade={fade} // Faded dots (default=true)
        />
    );
};

export default function StarsCanva(){
    return (
        <div className="h-auto w-full absolute inset-0 z-[-1]">
            <Canvas>
                <StarsObj />
            </Canvas>
        </div>
    );
};

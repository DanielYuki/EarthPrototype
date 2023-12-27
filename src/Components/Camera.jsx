import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useControls, button } from "leva";
import { OrbitControls } from "@react-three/drei";

export default function Camera() {
    const cameraRef = useRef();

    const { camera } = useThree();

    const animDuration = 3;

    useEffect(() => {
        cameraRef.current.enabled = false;

        gsap.to(camera.position, {
            x: 0,
            y: 0,
            z: 5,
            duration: animDuration,
            ease: "power2.inOut",
            onUpdate: () => {
                camera.lookAt(0, 0, 0);
            },
            onComplete: () => {
                cameraRef.current.enabled = true;
            },
        });
    }, []);

    useControls("Camera", {
        anim1: button(() => {
            cameraRef.current.enabled = false;

            gsap.to(camera.position, {
                x: -5,
                y: 2,
                z: -5,
                duration: animDuration,
                ease: "power2.inOut",
                onUpdate: () => {
                    camera.lookAt(0, 0, 0);
                },
                onComplete: () => {
                    cameraRef.current.enabled = true;
                },
            });
        }),
        reset: button(() => {
            cameraRef.current.enabled = false;

            gsap.to(camera.position, {
                x: 0,
                y: 0,
                z: 5,
                duration: animDuration,
                ease: "power2.inOut",
                onUpdate: () => {
                    camera.lookAt(0, 0, 0);
                },
                onComplete: () => {
                    cameraRef.current.enabled = true;
                },
            });
        }),
    });

    return (
        <group>
            <OrbitControls
                ref={cameraRef}
                target={[0, 0, 0]}
                // autoRotate
                // autoRotateSpeed={0.75}
                // enableZoom={false}
                minDistance={3}
                maxDistance={25}
                enablePan={false}
                maxPolarAngle={(Math.PI * 2) / 3}
                minPolarAngle={Math.PI / 3}
            />
        </group>
    );
}

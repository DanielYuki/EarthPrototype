import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
    const { progress } = useProgress();

    return (
        <Html center>
            <img src="/icon512.png" alt="Earth Placeholder" />
            <h1 className=" text-white mt-4">
                LOADING... {progress.toFixed(2)}%
            </h1>
        </Html>
    )
}
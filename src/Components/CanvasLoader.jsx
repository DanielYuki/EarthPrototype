import { Html, useProgress } from '@react-three/drei';

export default function CanvasLoader() {
    const { progress } = useProgress();

    return (
        <Html center>
            <h1 className=" text-white">
                LOADING... {progress.toFixed(2)}%
            </h1>
        </Html>
    )
}
import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
    const { progress } = useProgress();

    return (
        <Html center>
            <div className="flex justify-center items-center z-20 h-screen w-screen flex-col bg-slate-950">
                <img
                    className="h-32 sm:h-64 w-32 sm:w-64"
                    src="/icon512.png"
                    alt="Earth Placeholder"
                />
                <h1 className="text-white mt-2 sm:mt-4 text-xl sm:text-2xl">
                    LOADING... {progress.toFixed(2)}%
                </h1>
            </div>
        </Html>
    );
}

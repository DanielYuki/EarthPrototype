import { useState, useEffect } from "react";
import { Leva, useControls } from "leva";
import { gsap } from "gsap";

import EarthCanva from "./Components/Earth";
// import StarsCanva from "./Components/Stars";

function App() {
    const [{ isShowing }, set] = useControls("Text", () => ({
        isShowing: {
            value: true,
        },
    }));

    useEffect(() => {
        gsap.fromTo(
            ".meh-transition",
            { opacity: 0, scale: 0.25 },
            {
                opacity: isShowing ? 1 : 0,
                scale: isShowing ? 1 : 0.25,
                duration: 1.25,
                delay: 2.75,
                ease: "power2.inOut",
            }
        );
    }, [isShowing]);

    return (
        <div className="flex h-[100vh] w-[100vw] justify-center items-center">
            <Leva collapsed={true} hidden={false} />
            <h1
                className={`meh-transition absolute pointer-events-none select-none mb-4 sm:mb-10 tracking-[1rem] text-[8rem] sm:text-[18rem] z-10 font-extrabold text-white`}
            >
                世界
            </h1>

            <EarthCanva />
            {/* <StarsCanva /> */}
        </div>
    );
}

export default App;

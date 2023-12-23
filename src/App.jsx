import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import EarthCanva from "./Components/Earth";
import StarsCanva from "./Components/Stars";

function App() {
    return (
        <div className="flex h-[100vh] w-[100vw] justify-center items-center">
            {/* <h1 className="absolute pointer-events-none select-none mb-10 tracking-[1rem] text-[18rem] z-10 font-extrabold text-white">
                世界
            </h1> */}
			<EarthCanva />
			<StarsCanva />
        </div>
    );
}

export default App;

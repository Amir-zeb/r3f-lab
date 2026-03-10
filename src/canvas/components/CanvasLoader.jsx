import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
    const { progress } = useProgress();

    return (
        <Html center transform occlude={false}>
            {/* <div className="flex flex-col items-center text-white font-mono opacity-90 space-y-3 animate-pulse w-48">
                <span className="text-sm tracking-wide">Loading 3D… {Math.floor(progress)}%</span>
                <div className="w-full h-2 bg-(--primary)/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-(--primary)/80 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div> */}
            <div>
                Loading 3D… {Math.floor(progress)}%
            </div>
        </Html>
    );
}

export default CanvasLoader;
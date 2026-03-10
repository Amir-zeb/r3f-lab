import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useRef } from "react";

const SphereShape = ({ args, position, rotation = [0, 0, 0], color, metalness = 1, roughness = 0.75, folderName = 'sphere', ...props }) => {
    const ref = useRef()
    const controls = useControls({
        [`${folderName}`]: folder({
            color,
            roughness: { value: roughness, min: 0, max: 1, step: 0.05 },
            metalness: { value: metalness, min: 0, max: 1, step: 0.25 },
        }, { collapsed: true })
    })

    // --------------------------
    // Continuous rotation
    // --------------------------
    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;

        const offset = Math.sin(t) * 0.1;

        ref.current.position.x = position[0] + offset;  // rotate around X
        ref.current.position.y = position[1] + offset;  // rotate around Y
    });

    return (
        <mesh ref={ref} position={position} rotation={rotation}>
            <sphereGeometry args={args} />
            <meshStandardMaterial
                color={controls.color || color}
                roughness={controls.roughness || roughness}
                metalness={controls.metalness || metalness}
                emissive={color}
                emissiveIntensity={0.05}
                {...props}
            />
        </mesh>
    );
}

export default SphereShape;
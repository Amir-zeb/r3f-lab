import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ConeShape = ({ position = [0, 0, 0], rotation = [0, 0, 0], folderName = '', axis, color: c = '#fff', isNear = true, negative = false }) => {
    const ref = useRef();
    const offset = useRef(0);
    // const rotOffset = useRef(0);
    // const rotationSpeed = useRef(0);
    const sign = negative ? -1 : 1;


    const controls = useControls({
        [`${folderName}`]: folder({
            // color: c,
            color: '#ffffff',
            samples: { value: 32, min: 1, max: 64, step: 1 },
            resolution: { value: 1024, min: 128, max: 2048, step: 128 },
            transmission: { value: 0.1, min: 0, max: 1, step: 0.01 },
            thickness: { value: 0, min: 0, max: 2, step: 0.01 },
            ior: { value: 2.5, min: 1, max: 2.5, step: 0.01 },
            chromaticAberration: { value: 0.05, min: 0, max: 0.2, step: 0.01 },
            roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
            anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
            distortion: { value: 0.05, min: 0, max: 1, step: 0.01 },
            distortionScale: { value: 0.3, min: 0, max: 2, step: 0.01 },
            temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
            side: { options: { FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide } }
        }, { collapsed: true })
    });

    // const controls = {
    //     color: '#ffffff',
    //     samples: 32,
    //     resolution: 1024,
    //     transmission: 0.1,
    //     thickness: 0,
    //     ior: 2.5,
    //     chromaticAberration: 0.05,
    //     roughness: 0.2,
    //     anisotropy: 0.1,
    //     distortion: 0.05,
    //     distortionScale: 0.3,
    //     temporalDistortion: 0.1,
    //     side: THREE.FrontSide
    // }

    useFrame((state, delta) => {
        if (!ref.current) return;
        // Get elapsed time in seconds
        const time = state.clock.getElapsedTime();

        // -------------------------------
        // Smooth Near ↔ Far Transition
        // -------------------------------
        const target = isNear ? 0 : 0.5;
        offset.current = THREE.MathUtils.lerp(
            offset.current,
            target,
            delta * 10 // smooth, frame-rate independent
        );
        // Clamp to avoid floating tail
        offset.current = THREE.MathUtils.clamp(offset.current, 0, 0.5);
        const isTransitioning = Math.abs(offset.current - target) > 0.0005;
        // Base position: near = original, far = offset by 1 unit
        const baseOffset = offset.current * sign;
        // compute base position for the selected axis
        let posX = position[0];
        let posY = position[1];
        let posZ = position[2];

        if (axis === "x") posX = position[0] + baseOffset;
        if (axis === "y") posY = position[1] + baseOffset;
        if (axis === "z") posZ = position[2] + baseOffset;

        // OUTWARD → RETURN (0 → 1 → 0)
        const bounce = Math.abs(Math.sin(time * 0.5)) * 0.3 * sign;

        // now add bounce around the base position
        if (axis === "x") ref.current.position.x = posX + bounce;
        if (axis === "y") ref.current.position.y = posY + bounce;
        if (axis === "z") ref.current.position.z = posZ + bounce;
    })

    return (
        <mesh ref={ref} position={position} rotation={rotation}>
            <coneGeometry args={[1, 1.5, 4]} />
            <MeshTransmissionMaterial
                color={controls.color}
                samples={controls.samples}
                resolution={controls.resolution}
                transmission={controls.transmission}
                thickness={controls.thickness}
                ior={controls.ior}
                chromaticAberration={controls.chromaticAberration}
                roughness={controls.roughness}
                anisotropy={controls.anisotropy}
                distortion={controls.distortion}
                distortionScale={controls.distortionScale}
                temporalDistortion={controls.temporalDistortion}
                side={controls.side}
            />
        </mesh>
    );
}

export default ConeShape
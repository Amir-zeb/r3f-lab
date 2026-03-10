import { useHelper } from "@react-three/drei";
import { folder, useControls } from "leva";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

const DirLightWithHelper = ({ folderName, position, color }) => {
    const dirLightRef = useRef(null);
    const controls = useControls({
        [`${folderName}`]: folder({
            color,
            intensity: { value: 3.08, min: 0, max: 10, step: .01 },
            axisX: { value: position[0], min: -100, max: 100, step: 1 },
            axisY: { value: position[1], min: -100, max: 100, step: 1 },
            axisZ: { value: position[2], min: -100, max: 100, step: 1 },
        }, { collapsed: true })
    })
    // const controls = {
    //     color,
    //     intensity: 3.08,
    //     axisX: position[0],
    //     axisY: position[1],
    //     axisZ: position[2],
    // }

    const { axisX, axisY, axisZ, intensity } = controls


    // Attach the DirectionalLightHelper to the directionalLight
    // Arguments: ref, HelperClass, [size], [color]
    useHelper(dirLightRef, DirectionalLightHelper, 1, '#ffffff');

    return (
        <>
            <directionalLight ref={dirLightRef} position={[axisX, axisY, axisZ]} color={controls.color} intensity={intensity} />
        </>
    )
}

export default DirLightWithHelper;
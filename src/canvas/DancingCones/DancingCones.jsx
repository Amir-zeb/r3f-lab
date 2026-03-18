import { Canvas, useFrame } from "@react-three/fiber";
import DirLightWithHelper from "../components/DirLightWithHelper";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../components/CanvasLoader";
import { Suspense, useRef } from "react";
import ResponsiveOrthoCamera from "../components/ResponsiveOrthoCamera";
import SphereShape from "../components/SphereShape";
import ConeShape from "../components/ConeShape";
import { useControls } from "leva";

const DancingCones = () => {
    return (
        <>
            <Canvas
                orthographic
                camera={{
                    position: [0, 0, 5],
                    fov: 75,
                    near: 0.1,
                    far: 1000,
                }}
                gl={{ antialias: true }}
                shadows={false}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
            >
                <color attach="background" args={['#f0f0f0']} />
                <ResponsiveOrthoCamera />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Suspense fallback={<CanvasLoader />}>
                    <SphereWithCones />
                    <SpheresGroup />
                </Suspense>
                <DirLightWithHelper folderName='DirLight1' position={[3, 6, 5]} color='#f5f2f2' />
                <ambientLight intensity={0.1} color="#ffffff" />
            </Canvas>
        </>
    );
}

export default DancingCones;

const SpheresGroup = () => {
    // unable to find it in assets
    // const texture = useTexture('../../assets/textures/liquid-marbling-texture.jpg')
    const texture = useTexture('/liquid-marbling-texture.jpg')
    return (
        <group position={[2, 0, 0]}>
            <SphereShape args={[0.2, 20]} position={[0, 2, -2]} color="#d751de" folderName='cube1' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
            <SphereShape args={[0.1, 20]} position={[-5, 2, 2]} color="#78f5a5" folderName='cube2' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
            <SphereShape args={[0.3, 20]} position={[-5, -3, -2]} color="#5871d1" folderName='cube3' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
            <SphereShape args={[0.3, 20]} position={[-1, -2, 2]} color="#cb9292" folderName='cube4' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
        </group>
    )
}

const SphereWithCones = () => {
    const ref = useRef()
    const texture = useTexture('/liquid-marbling-texture.jpg')

    const controls = useControls({
        radius: { value: 1, min: 0, max: 10, step: .1 },
        gap: { value: 0.45, min: 0, max: 10, step: .1 },
    }, { collapsed: true })
    // const controls = {
    //     radius: 1,
    //     gap: 0.45,
    // }
    const { radius, gap } = controls

    // --------------------------
    // Continuous rotation
    // --------------------------
    useFrame(() => {
        if (!ref.current) return;

        ref.current.rotation.x += 0.009 * 0.1;  // rotate around X
        ref.current.rotation.y += 0.009 * 0.1;  // rotate around Y
        ref.current.rotation.z += 0.005 * 0.1; // optional: rotate around Z slower
    });

    return (
        <group ref={ref} position={[0, 0, 0]} >
            {/* Cube */}
            <SphereShape color='#ff0099' position={[0, 0, 0]} args={[0.7, 32, 32]}
                map={texture}
                roughness={0.55}
                metalness={1}
                folderName='innerSphere'
            />

            {/* +X Face */}
            <ConeShape
                position={[radius + gap, 0, 0]}
                rotation={[Math.PI / 4, 0, -Math.PI / 2]}
                folderName='+X Face'
                axis='x'
                color='#4b4b4b'
            />

            {/* -X Face */}
            <ConeShape
                position={[-radius - gap, 0, 0]}
                rotation={[Math.PI / 4, 0, Math.PI / 2]}
                folderName='-X Face'
                axis='x'
                negative
                color='#4b4b4b'
            />

            {/* +Y Face */}
            <ConeShape
                position={[0, radius + gap, 0]}
                rotation={[0, THREE.MathUtils.degToRad(135), 0]}
                folderName='+Y Face'
                axis='y'
                color='#4b4b4b'
            />

            {/* -Y Face */}
            <ConeShape
                position={[0, -radius - gap, 0]}
                rotation={[Math.PI / 1, Math.PI / 4, 0]}
                folderName='-Y Face'
                axis='y'
                negative
                color='#4b4b4b'
            />

            {/* +Z Face */}
            <ConeShape
                position={[0, 0, radius + gap]}
                rotation={[Math.PI / 2, Math.PI / 4, 0]}
                folderName='+Z Face'
                axis='z'
                color='#4b4b4b'
            />

            {/* -Z Face */}
            <ConeShape
                position={[0, 0, -radius - gap]}
                rotation={[-Math.PI / 2, Math.PI / 4, 0]}
                folderName='-Z Face'
                negative
                color='#4b4b4b'
            />
        </group>
    );
}
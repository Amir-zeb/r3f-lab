import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Stars from "../components/Stars";

const Globe = () => {
    return (
        <Canvas orthographic
            camera={{
                zoom: 100,
                position: [0, 0, 20],
                fov: 75,
                near: 0.1,
                far: 1000
            }}>
            <color attach="background" args={['#333']} />
            <OrbitControls enableZoom={false} enablePan={true} />
            <Stars />
            <Stars count={20} size={20} />
            <Planet position={[0, -4, 0]} args={[4, 20, 20]} />
            <SmallPlanet position={[-2, 0, 2]} args={[0.4, 20, 20]} />
            <SmallPlanet position={[3, 0, -2]} args={[0.2, 20, 20]} />
            <SmallPlanet position={[-4, 1, -2]} args={[0.2, 20, 20]} />
            <pointLight position={[0, 7, -5]} intensity={100} color='#fff' />
            <pointLight position={[0, 3, -2]} intensity={100} color='#fff' />
            <ambientLight intensity={1} color="#ffffff" />
        </Canvas>
    );
}

export default Globe;

const Planet = ({ position, args }) => {
    const ref = useRef()
    const texture = useTexture(import.meta.env.BASE_URL + "/2k_earth_nightmap.jpg");

    useFrame(() => {
        ref.current.rotation.x += 0.001
        ref.current.rotation.y += 0.001
        ref.current.rotation.z += 0.001
    })

    return (
        <mesh ref={ref} position={position}>
            <icosahedronGeometry args={args} />
            <meshStandardMaterial map={texture}
            />
        </mesh>
    )
}

const SmallPlanet = ({ position, args }) => {
    const ref = useRef()

    return (
        <mesh ref={ref} position={position}>
            <icosahedronGeometry args={args} />
            <meshStandardMaterial color='#333' />
        </mesh>
    )
}

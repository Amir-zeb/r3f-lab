import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const ResponsiveOrthoCamera = () => {
    const { camera, size } = useThree();

    useEffect(() => {
        // Ensure the camera is orthographic before making adjustments
        if (camera.isOrthographicCamera) {
            // Set the camera's view frustum based on the viewport size
            const aspect = size.width / size.height;
            const frustumSize = 4; // Or any other value that works for your scene
            camera.left = -frustumSize * aspect;
            camera.right = frustumSize * aspect;
            camera.top = frustumSize;
            camera.bottom = -frustumSize;
            camera.updateProjectionMatrix();
        }
    }, [camera, size]); // Re-run effect when camera or size changes

    return null; // This component doesn't render anything itself
}

export default ResponsiveOrthoCamera
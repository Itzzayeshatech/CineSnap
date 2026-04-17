import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";

const MovingStars = () => {
  const starsRef = useRef();

  useFrame((state) => {
    if (starsRef.current) {
      // Subtle rotation for a feeling of drifting through space
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      starsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={7000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
    </group>
  );
};

const Starfield = () => {
  return (
    <div id="canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <MovingStars />
        
        {/* Adds a deeper sense of space with floating nebula-like points */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={[-5, 2, -10]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial 
              color="#7e22ce" 
              emissive="#7e22ce" 
              emissiveIntensity={2} 
              transparent 
              opacity={0.3} 
            />
          </mesh>
        </Float>

        <Float speed={3} rotationIntensity={0.8} floatIntensity={1}>
          <mesh position={[5, -3, -15]}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial 
              color="#06b6d4" 
              emissive="#06b6d4" 
              emissiveIntensity={2} 
              transparent 
              opacity={0.2} 
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

export default Starfield;

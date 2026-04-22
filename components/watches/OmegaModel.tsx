import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const OmegaModel = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.007;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.05;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Sleek Thin Case */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.2, 64]} />
        <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>

      {/* Thin Bezel */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.05, 16, 64]} />
        <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>

      {/* Minimalist Lugs */}
      <mesh position={[1, 2, -0.05]} rotation={[0, 0, -0.2]}>
         <boxGeometry args={[0.2, 0.8, 0.1]} />
         <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>
      <mesh position={[-1, 2, -0.05]} rotation={[0, 0, 0.2]}>
         <boxGeometry args={[0.2, 0.8, 0.1]} />
         <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>
      <mesh position={[1, -2, -0.05]} rotation={[0, 0, 0.2]}>
         <boxGeometry args={[0.2, 0.8, 0.1]} />
         <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>
      <mesh position={[-1, -2, -0.05]} rotation={[0, 0, -0.2]}>
         <boxGeometry args={[0.2, 0.8, 0.1]} />
         <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>

      {/* Leather-style Strap */}
      <mesh position={[0, 3, -0.1]} rotation={[Math.PI / 2, -0.1, 0]}>
        <boxGeometry args={[1.6, 2.5, 0.1]} />
        <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>
      <mesh position={[0, -3, -0.1]} rotation={[Math.PI / 2, 0.1, 0]}>
        <boxGeometry args={[1.6, 2.5, 0.1]} />
        <meshStandardMaterial color="#00aaff" wireframe />
      </mesh>
    </group>
  );
};

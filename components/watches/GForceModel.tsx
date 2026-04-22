import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GForceModel = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y -= 0.005;
      group.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Rugged Case Body - Octagonal */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.8, 8]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>

      {/* Inner Dial */}
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.4, 32]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>

      {/* Chunky Buttons */}
      <mesh position={[2.1, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.6, 0.4]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>
      <mesh position={[2.1, -1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.6, 0.4]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>
      <mesh position={[-2.1, 1.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.6, 0.4]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>
      <mesh position={[-2.1, -1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.6, 0.6, 0.4]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>

      {/* Top Strap - Wide and textured */}
      <mesh position={[0, 2.8, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2, 2, 0.3]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>

      {/* Bottom Strap */}
      <mesh position={[0, -2.8, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2, 2, 0.3]} />
        <meshStandardMaterial color="#ff00ff" wireframe />
      </mesh>
    </group>
  );
};

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RolexModel = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Dial / Case Body */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.4, 32]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>

      {/* Fluted Bezel (approximation with a TorusKnot or Torus with segments) */}
      <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.15, 16, 64]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>

      {/* Crown */}
      <mesh position={[2.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>

      {/* Top Strap */}
      <mesh position={[0, 2.5, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.6, 2, 0.2]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>
      <mesh position={[0, 4.5, -0.2]} rotation={[Math.PI / 2, -0.1, 0]}>
        <boxGeometry args={[1.4, 2, 0.2]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>

      {/* Bottom Strap */}
      <mesh position={[0, -2.5, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.6, 2, 0.2]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>
      <mesh position={[0, -4.5, -0.2]} rotation={[Math.PI / 2, 0.1, 0]}>
        <boxGeometry args={[1.4, 2, 0.2]} />
        <meshStandardMaterial color="#00ffcc" wireframe />
      </mesh>
    </group>
  );
};

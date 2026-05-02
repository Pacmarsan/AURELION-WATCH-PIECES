import React, { useRef } from 'react';
import * as THREE from 'three';
import { GroupProps, useFrame } from '@react-three/fiber';

type RolexModelProps = GroupProps & {
  progress?: number;
};

export const RolexModel = ({ progress = 1, ...props }: RolexModelProps) => {
  const group = useRef<THREE.Group>(null);

  // High-fidelity materials
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#E8CA58',
    metalness: 1.0,
    roughness: 0.15,
    envMapIntensity: 2.0,
  });

  const emeraldDialMaterial = new THREE.MeshStandardMaterial({
    color: '#0A3B2A',
    metalness: 0.4,
    roughness: 0.3,
  });

  const subDialMaterial = new THREE.MeshStandardMaterial({
    color: '#E8CA58',
    metalness: 0.8,
    roughness: 0.4,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95, // glass effect
    ior: 1.5,
    thickness: 0.5,
    transparent: true,
    opacity: 1,
  });

  const markerMaterial = new THREE.MeshStandardMaterial({
    color: '#FFFFFF',
    metalness: 0.1,
    roughness: 0.8,
    emissive: '#ffffff',
    emissiveIntensity: 0.2,
  });

  // Rotate hands
  const secondsHandRef = useRef<THREE.Mesh>(null);
  const minutesHandRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (secondsHandRef.current) secondsHandRef.current.rotation.z = -t;
    if (minutesHandRef.current) minutesHandRef.current.rotation.z = -t / 60;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Main Case */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 0.4, 64]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Bezel Ring (Tachymeter) */}
      <mesh position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1.95, 2.0, 0.1, 64]} />
        <primitive object={goldMaterial} />
      </mesh>
      {/* Bezel Insert */}
      <mesh position={[0, 0, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.65, 1.95, 64]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Emerald Green Dial */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.65, 1.65, 0.05, 64]} />
        <primitive object={emeraldDialMaterial} />
      </mesh>

      {/* Hour Markers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin((i * Math.PI) / 6) * 1.4, 
            Math.cos((i * Math.PI) / 6) * 1.4, 
            0.18
          ]} 
          rotation={[0, 0, (-i * Math.PI) / 6]}
        >
          <boxGeometry args={[0.08, 0.25, 0.04]} />
          <primitive object={markerMaterial} />
        </mesh>
      ))}

      {/* Sub-dials (Chronograph) */}
      {[[-0.6, 0, 0.18], [0.6, 0, 0.18], [0, -0.6, 0.18]].map((pos, i) => (
        <group key={i} position={pos as any}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
            <primitive object={subDialMaterial} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.3, 0.3, 0.01, 32]} />
            <primitive object={emeraldDialMaterial} />
          </mesh>
        </group>
      ))}

      {/* Center Hands */}
      <mesh ref={minutesHandRef} position={[0, 0, 0.22]}>
         <boxGeometry args={[0.08, 1.2, 0.02]} />
         <primitive object={goldMaterial} />
         {/* Lume strip */}
         <mesh position={[0, 0.2, 0.02]}>
            <boxGeometry args={[0.04, 0.6, 0.01]} />
            <primitive object={markerMaterial} />
         </mesh>
      </mesh>
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 3]}>
         <boxGeometry args={[0.1, 0.8, 0.02]} />
         <primitive object={goldMaterial} />
         <mesh position={[0, 0.1, 0.02]}>
            <boxGeometry args={[0.04, 0.4, 0.01]} />
            <primitive object={markerMaterial} />
         </mesh>
      </mesh>
      
      {/* Chronograph Seconds Hand */}
      <mesh ref={secondsHandRef} position={[0, 0, 0.24]}>
         <boxGeometry args={[0.03, 1.6, 0.01]} />
         <meshStandardMaterial color="#CC0000" />
      </mesh>
      <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Sapphire Crystal Dome */}
      <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.65, 1.65, 0.15, 64]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Crown */}
      <mesh position={[2.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.35, 32]} />
        <primitive object={goldMaterial} />
      </mesh>
      {/* Crown Guards */}
      <mesh position={[2.0, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.4, 0.4]} />
        <primitive object={goldMaterial} />
      </mesh>
      <mesh position={[2.0, -0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.2, 0.4, 0.4]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Chrono Pushers */}
      <mesh position={[1.9, 0.9, 0]} rotation={[0, 0, Math.PI / 3]}>
        <cylinderGeometry args={[0.12, 0.15, 0.4, 16]} />
        <primitive object={goldMaterial} />
      </mesh>
      <mesh position={[1.9, -0.9, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <cylinderGeometry args={[0.12, 0.15, 0.4, 16]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Lugs & Bracelet Start */}
      <mesh position={[0, 2.2, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 1.2, 0.3]} />
        <primitive object={goldMaterial} />
      </mesh>
      <mesh position={[0, -2.2, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 1.2, 0.3]} />
        <primitive object={goldMaterial} />
      </mesh>
    </group>
  );
};

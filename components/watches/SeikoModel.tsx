import React, { useRef } from 'react';
import * as THREE from 'three';
import { GroupProps, useFrame } from '@react-three/fiber';

type SeikoModelProps = GroupProps & {
  progress?: number;
};

export const SeikoModel = ({ progress = 1, ...props }: SeikoModelProps) => {
  const group = useRef<THREE.Group>(null);

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: '#E0E5E9',
    metalness: 0.95,
    roughness: 0.2,
    envMapIntensity: 1.8,
  });

  const blueDialMaterial = new THREE.MeshStandardMaterial({
    color: '#0F2A5A',
    metalness: 0.6,
    roughness: 0.4,
  });

  const subDialMaterial = new THREE.MeshStandardMaterial({
    color: '#0A1C3C',
    metalness: 0.7,
    roughness: 0.5,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 0.95,
    ior: 1.5,
    thickness: 0.5,
    transparent: true,
    opacity: 1,
  });

  const secondsHandRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (secondsHandRef.current) {
      secondsHandRef.current.rotation.z = -state.clock.elapsedTime * 2;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* 45mm Case */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.25, 2.25, 0.4, 64]} />
        <primitive object={steelMaterial} />
      </mesh>

      {/* Tachymeter Bezel */}
      <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.1, 2.25, 0.1, 64]} />
        <primitive object={steelMaterial} />
      </mesh>
      
      {/* Black Bezel Insert */}
      <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.1, 64]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Deep Blue Dial */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.75, 1.75, 0.05, 64]} />
        <primitive object={blueDialMaterial} />
      </mesh>

      {/* Sub-dials */}
      {[[-0.7, 0, 0.18], [0, -0.8, 0.18], [0.7, 0, 0.18]].map((pos, i) => (
        <group key={i} position={pos as any}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.02, 32]} />
            <primitive object={steelMaterial} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
            <primitive object={subDialMaterial} />
          </mesh>
        </group>
      ))}

      {/* Hands */}
      <mesh position={[0, 0, 0.25]} rotation={[0, 0, -Math.PI / 3]}>
         <boxGeometry args={[0.08, 1.5, 0.02]} />
         <primitive object={steelMaterial} />
      </mesh>
      <mesh position={[0, 0, 0.22]} rotation={[0, 0, Math.PI / 4]}>
         <boxGeometry args={[0.08, 1.0, 0.02]} />
         <primitive object={steelMaterial} />
      </mesh>
      
      {/* Red Chrono Hand */}
      <mesh ref={secondsHandRef} position={[0, 0, 0.28]}>
         <boxGeometry args={[0.03, 1.8, 0.02]} />
         <meshStandardMaterial color="#FF1111" />
      </mesh>

      {/* Mineral Crystal Glass */}
      <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.05, 64]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Crown */}
      <mesh position={[2.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3, 32]} />
        <primitive object={steelMaterial} />
      </mesh>

      {/* Pushers */}
      <mesh position={[2.1, 1.1, 0]} rotation={[0, 0, Math.PI / 3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <primitive object={steelMaterial} />
      </mesh>
      <mesh position={[2.1, -1.1, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <primitive object={steelMaterial} />
      </mesh>

      {/* Steel Link Bracelet Start */}
      <mesh position={[0, 2.5, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.6, 1.2, 0.3]} />
        <primitive object={steelMaterial} />
      </mesh>
      <mesh position={[0, -2.5, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.6, 1.2, 0.3]} />
        <primitive object={steelMaterial} />
      </mesh>
    </group>
  );
};

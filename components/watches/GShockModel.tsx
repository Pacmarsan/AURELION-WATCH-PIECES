import React, { useRef } from 'react';
import * as THREE from 'three';
import { GroupProps, useFrame } from '@react-three/fiber';

type GShockModelProps = GroupProps & {
  progress?: number;
};

export const GShockModel = ({ progress = 1, ...props }: GShockModelProps) => {
  const group = useRef<THREE.Group>(null);

  // Materials
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: '#D0D5DB',
    metalness: 0.9,
    roughness: 0.4,
    envMapIntensity: 1.5,
  });

  const resinMaterial = new THREE.MeshStandardMaterial({
    color: '#1A1C1E',
    metalness: 0.2,
    roughness: 0.8,
  });

  const dialMaterial = new THREE.MeshStandardMaterial({
    color: '#2A2C2E',
    metalness: 0.5,
    roughness: 0.6,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: '#FF3333',
    metalness: 0.5,
    roughness: 0.5,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    ior: 1.5,
    thickness: 0.5,
    transparent: true,
    opacity: 1,
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Core Resin Case */}
      <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.4, 2.4, 0.6, 32]} />
        <primitive object={resinMaterial} />
      </mesh>

      {/* Forged Stainless Steel Octagonal Bezel */}
      <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.2, 2.3, 0.2, 8]} />
        <primitive object={steelMaterial} />
      </mesh>

      {/* Bezel Screws */}
      {[
        [-1.8, 1.8], [1.8, 1.8], [-1.8, -1.8], [1.8, -1.8]
      ].map((pos, i) => (
        <mesh key={i} position={[pos[0], pos[1], 0.35]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          <primitive object={resinMaterial} />
        </mesh>
      ))}

      {/* Multi-layered Dial */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.05, 32]} />
        <primitive object={dialMaterial} />
      </mesh>
      
      {/* 3D Hour Markers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin((i * Math.PI) / 6) * 1.6, 
            Math.cos((i * Math.PI) / 6) * 1.6, 
            0.2
          ]} 
          rotation={[0, 0, (-i * Math.PI) / 6]}
        >
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <primitive object={steelMaterial} />
        </mesh>
      ))}

      {/* Sub-dials */}
      <mesh position={[-0.7, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <primitive object={resinMaterial} />
      </mesh>
      <mesh position={[0.7, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <primitive object={resinMaterial} />
      </mesh>
      <mesh position={[0, -0.7, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.02, 32]} />
        <primitive object={resinMaterial} />
      </mesh>

      {/* Chunky Hands */}
      <mesh position={[0, 0, 0.25]} rotation={[0, 0, Math.PI / 6]}>
         <boxGeometry args={[0.15, 1.4, 0.05]} />
         <primitive object={steelMaterial} />
      </mesh>
      <mesh position={[0, 0, 0.23]} rotation={[0, 0, -Math.PI / 3]}>
         <boxGeometry args={[0.15, 1.0, 0.05]} />
         <primitive object={steelMaterial} />
      </mesh>
      
      {/* Accent Second Hand */}
      <mesh position={[0, 0, 0.28]} rotation={[0, 0, Math.PI / 2]}>
         <boxGeometry args={[0.04, 1.8, 0.02]} />
         <primitive object={accentMaterial} />
      </mesh>

      {/* Pushers / Buttons */}
      {[
        [-2.2, 1.2], [-2.2, -1.2], [2.2, 1.2], [2.2, -1.2]
      ].map((pos, i) => (
        <group key={i} position={[pos[0], pos[1], 0]} rotation={[0, 0, Math.atan2(pos[1], pos[0])]}>
          {/* Button guard */}
          <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[0.3, 0.6, 0.4]} />
            <primitive object={resinMaterial} />
          </mesh>
          {/* Button */}
          <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
            <primitive object={steelMaterial} />
          </mesh>
        </group>
      ))}

      {/* Flat Sapphire Crystal */}
      <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.0, 2.0, 0.05, 32]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Chunky Straps */}
      <mesh position={[0, 2.8, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 1.8, 0.4]} />
        <primitive object={resinMaterial} />
      </mesh>
      <mesh position={[0, -2.8, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 1.8, 0.4]} />
        <primitive object={resinMaterial} />
      </mesh>
    </group>
  );
};

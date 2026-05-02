import React, { useRef } from 'react';
import * as THREE from 'three';
import { GroupProps, useFrame } from '@react-three/fiber';

type MovadoModelProps = GroupProps & {
  progress?: number;
};

export const MovadoModel = ({ progress = 1, ...props }: MovadoModelProps) => {
  const group = useRef<THREE.Group>(null);

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    metalness: 1.0,
    roughness: 0.2,
    envMapIntensity: 1.5,
  });

  const blueDialMaterial = new THREE.MeshStandardMaterial({
    color: '#0A1C32',
    metalness: 0.5,
    roughness: 0.4,
  });

  const leatherMaterial = new THREE.MeshStandardMaterial({
    color: '#3B2314',
    metalness: 0.1,
    roughness: 0.9,
    bumpScale: 0.05,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    thickness: 0.3,
    transparent: true,
    opacity: 1,
  });

  const secondsHandRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (secondsHandRef.current) {
      secondsHandRef.current.rotation.z = -state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* 42mm Slim Case */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.1, 2.1, 0.25, 64]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Smooth Bezel */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.1, 32, 64]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Sunray Blue Dial */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.95, 1.95, 0.05, 64]} />
        <primitive object={blueDialMaterial} />
      </mesh>

      {/* Iconic Movado Dot at 12 */}
      <mesh position={[0, 1.4, 0.15]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} rotation={[Math.PI/2, 0, 0]}/>
        <primitive object={goldMaterial} />
      </mesh>

      {/* Movado Sub-dials (3) */}
      {[[-0.6, 0.3, 0.12], [0.6, 0.3, 0.12], [0, -0.6, 0.12]].map((pos, i) => (
        <mesh key={i} position={pos as any} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
          <meshStandardMaterial color="#05101C" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}

      {/* Slim Hands */}
      <mesh position={[0, 0, 0.18]} rotation={[0, 0, -Math.PI / 6]}>
         <boxGeometry args={[0.04, 1.4, 0.01]} />
         <primitive object={goldMaterial} />
      </mesh>
      <mesh position={[0, 0, 0.16]} rotation={[0, 0, Math.PI / 1.5]}>
         <boxGeometry args={[0.04, 0.9, 0.01]} />
         <primitive object={goldMaterial} />
      </mesh>
      
      {/* Seconds */}
      <mesh ref={secondsHandRef} position={[0, 0, 0.2]}>
         <boxGeometry args={[0.02, 1.6, 0.01]} />
         <primitive object={goldMaterial} />
      </mesh>

      {/* Sapphire Crystal */}
      <mesh position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.95, 1.95, 0.05, 64]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Crown */}
      <mesh position={[2.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.25, 32]} />
        <primitive object={goldMaterial} />
      </mesh>
      
      {/* Chrono Pushers (Slim) */}
      <mesh position={[2.0, 0.8, 0]} rotation={[0, 0, Math.PI / 3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.25, 16]} />
        <primitive object={goldMaterial} />
      </mesh>
      <mesh position={[2.0, -0.8, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <cylinderGeometry args={[0.1, 0.1, 0.25, 16]} />
        <primitive object={goldMaterial} />
      </mesh>

      {/* Brown Leather Strap */}
      <mesh position={[0, 2.3, -0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[1.4, 2.0, 0.15]} />
        <primitive object={leatherMaterial} />
      </mesh>
      <mesh position={[0, -2.3, -0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[1.4, 2.0, 0.15]} />
        <primitive object={leatherMaterial} />
      </mesh>
    </group>
  );
};

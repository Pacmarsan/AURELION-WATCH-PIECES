import React, { useRef } from 'react';
import * as THREE from 'three';
import { GroupProps, useFrame } from '@react-three/fiber';

type OlevsModelProps = GroupProps & {
  progress?: number;
};

export const OlevsModel = ({ progress = 1, ...props }: OlevsModelProps) => {
  const group = useRef<THREE.Group>(null);

  const pvdMaterial = new THREE.MeshStandardMaterial({
    color: '#181A1C',
    metalness: 0.9,
    roughness: 0.3,
    envMapIntensity: 1.5,
  });

  const whiteDialMaterial = new THREE.MeshStandardMaterial({
    color: '#F0F0F0',
    metalness: 0.1,
    roughness: 0.8,
  });

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: '#B0B0B0',
    metalness: 0.9,
    roughness: 0.2,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    thickness: 0.4,
    transparent: true,
    opacity: 1,
  });

  const tourbillonRef = useRef<THREE.Mesh>(null);
  const moonPhaseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (tourbillonRef.current) tourbillonRef.current.rotation.y = t * 2;
    if (moonPhaseRef.current) moonPhaseRef.current.rotation.z = -t * 0.1;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Black PVD Case */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[2.05, 2.05, 0.4, 64]} />
        <primitive object={pvdMaterial} />
      </mesh>
      
      {/* Stepped Bezel */}
      <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1.9, 2.05, 0.1, 64]} />
        <primitive object={pvdMaterial} />
      </mesh>

      {/* Textured White Dial */}
      <mesh position={[0, 0, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 0.05, 64]} />
        <primitive object={whiteDialMaterial} />
      </mesh>

      {/* Sun/Moon Phase Subdial (Top) */}
      <group position={[0, 0.7, 0.16]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.02, 32]} />
          <meshStandardMaterial color="#0A1C32" metalness={0.2} roughness={0.8} />
        </mesh>
        <mesh ref={moonPhaseRef} position={[0, 0.1, 0.02]}>
          <cylinderGeometry args={[0.15, 0.15, 0.01, 16]} rotation={[Math.PI/2, 0, 0]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Skeletonized Tourbillon Aperture (Bottom) */}
      <group position={[0, -0.6, 0.12]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshStandardMaterial color="#111" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Tourbillon Bridge */}
        <mesh position={[0, 0, 0.06]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.2, 0.08, 0.02]} />
          <primitive object={steelMaterial} />
        </mesh>
        {/* Rotating Escapement */}
        <mesh ref={tourbillonRef} position={[0, 0, 0.04]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 12]} />
          <meshStandardMaterial color="#E8CA58" metalness={1} roughness={0.1} />
        </mesh>
      </group>

      {/* Roman Numeral Markers (Simplified with boxes) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin((i * Math.PI) / 6) * 1.6, 
            Math.cos((i * Math.PI) / 6) * 1.6, 
            0.18
          ]} 
          rotation={[0, 0, (-i * Math.PI) / 6]}
        >
          <boxGeometry args={[0.04, 0.2, 0.04]} />
          <primitive object={pvdMaterial} />
        </mesh>
      ))}

      {/* Sword Hands */}
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, -Math.PI / 4]}>
         <boxGeometry args={[0.06, 1.2, 0.02]} />
         <primitive object={pvdMaterial} />
      </mesh>
      <mesh position={[0, 0, 0.18]} rotation={[0, 0, Math.PI / 1.5]}>
         <boxGeometry args={[0.08, 0.8, 0.02]} />
         <primitive object={pvdMaterial} />
      </mesh>

      {/* Domed Sapphire Crystal */}
      <mesh position={[0, 0, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.1, 64]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Knurled Crown */}
      <mesh position={[2.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.3, 32]} />
        <primitive object={pvdMaterial} />
      </mesh>
      
      {/* Chrono Pushers */}
      <mesh position={[1.95, 0.8, 0]} rotation={[0, 0, Math.PI / 3]}>
        <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
        <primitive object={pvdMaterial} />
      </mesh>
      <mesh position={[1.95, -0.8, 0]} rotation={[0, 0, -Math.PI / 3]}>
        <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
        <primitive object={pvdMaterial} />
      </mesh>

      {/* Black PVD Bracelet */}
      <mesh position={[0, 2.5, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 1.8, 0.3]} />
        <primitive object={pvdMaterial} />
      </mesh>
      <mesh position={[0, -2.5, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 1.8, 0.3]} />
        <primitive object={pvdMaterial} />
      </mesh>
    </group>
  );
};

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll, Environment } from '@react-three/drei';
import * as THREE from 'three';

import { RolexModel } from './watches/RolexModel';
import { GShockModel } from './watches/GShockModel';
import { SeikoModel } from './watches/SeikoModel';
import { MovadoModel } from './watches/MovadoModel';
import { OlevsModel } from './watches/OlevsModel';

import { ScrollIndicator } from './ScrollIndicator';

interface ThreeDLandingPageProps {
  onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

const CinematicWatches = () => {
  const scroll = useScroll();
  const rolexRef = useRef<THREE.Group>(null);
  const gshockRef = useRef<THREE.Group>(null);
  const seikoRef = useRef<THREE.Group>(null);
  const movadoRef = useRef<THREE.Group>(null);
  const olevsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    // curve(start, distance)
    const r1 = scroll.curve(0.05, 0.3); // peaks at 0.2
    const r2 = scroll.curve(0.25, 0.3); // peaks at 0.4
    const r3 = scroll.curve(0.45, 0.3); // peaks at 0.6
    const r4 = scroll.curve(0.65, 0.3); // peaks at 0.8
    const r5 = scroll.curve(0.85, 0.3); // peaks at 1.0

    const t = state.clock.elapsedTime;

    if (rolexRef.current) {
      rolexRef.current.scale.setScalar(r1 * 0.9);
      rolexRef.current.position.x = -5 * (1 - r1);
      rolexRef.current.rotation.y = t * 0.5;
      rolexRef.current.rotation.z = (1 - r1) * Math.PI * 0.25;
      rolexRef.current.visible = r1 > 0.01;
    }

    if (gshockRef.current) {
      gshockRef.current.scale.setScalar(r2 * 0.9);
      gshockRef.current.position.y = -5 * (1 - r2);
      gshockRef.current.rotation.y = -t * 0.5;
      gshockRef.current.rotation.x = (1 - r2) * Math.PI * 0.25;
      gshockRef.current.visible = r2 > 0.01;
    }

    if (seikoRef.current) {
      seikoRef.current.scale.setScalar(r3 * 0.9);
      seikoRef.current.position.x = 5 * (1 - r3);
      seikoRef.current.rotation.y = t * 0.5;
      seikoRef.current.rotation.z = -(1 - r3) * Math.PI * 0.25;
      seikoRef.current.visible = r3 > 0.01;
    }

    if (movadoRef.current) {
      movadoRef.current.scale.setScalar(r4 * 0.9);
      movadoRef.current.position.y = 5 * (1 - r4);
      movadoRef.current.rotation.y = -t * 0.5;
      movadoRef.current.rotation.x = -(1 - r4) * Math.PI * 0.25;
      movadoRef.current.visible = r4 > 0.01;
    }

    if (olevsRef.current) {
      olevsRef.current.scale.setScalar(r5 * 0.9);
      olevsRef.current.position.z = -10 * (1 - r5);
      olevsRef.current.rotation.y = t * 0.5;
      olevsRef.current.rotation.x = (1 - r5) * Math.PI;
      olevsRef.current.visible = r5 > 0.01;
    }
  });

  return (
    <>
      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} />
      <Environment preset="city" />
      
      <group ref={rolexRef}><RolexModel /></group>
      <group ref={gshockRef}><GShockModel /></group>
      <group ref={seikoRef}><SeikoModel /></group>
      <group ref={movadoRef}><MovadoModel /></group>
      <group ref={olevsRef}><OlevsModel /></group>
    </>
  );
};

export const ThreeDLandingPage: React.FC<ThreeDLandingPageProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows>
          <ScrollControls pages={6} damping={0.2}>
            
            {/* 3D Cinematic Models */}
            <CinematicWatches />

            {/* HTML Overlay */}
            <Scroll html style={{ width: '100%', height: '100%' }}>
              
              {/* Page 1: Hero */}
              <div className="h-screen flex items-center justify-start pl-[10vw] pointer-events-none">
                 <div className="text-white max-w-md pointer-events-auto">
                     <h1 className="text-6xl font-bold tracking-tighter mb-4">AURELION</h1>
                     <p className="text-xl text-white/60 mb-8">Precision engineering. Detailed procedural 3D masterpieces.</p>
                     <button onClick={() => onNavigate('gallery')} className="px-6 py-3 border border-white/20 hover:border-white/60 transition-colors uppercase tracking-widest text-sm backdrop-blur-md">
                        View Full Gallery
                     </button>
                 </div>
              </div>

              {/* Page 2: Rolex Daytona */}
              <div className="h-screen flex items-center justify-end pr-[10vw] pointer-events-none">
                 <div className="text-[#E8CA58] max-w-sm bg-black/40 p-8 border border-[#E8CA58]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(232,202,88,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">Rolex Daytona</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#E8CA58]/20 pb-2">
                             <span className="opacity-70">Case</span>
                             <span className="font-semibold">Gold 40mm</span>
                         </li>
                         <li className="flex justify-between border-b border-[#E8CA58]/20 pb-2">
                             <span className="opacity-70">Dial</span>
                             <span className="font-semibold text-white">Emerald Green</span>
                         </li>
                         <li className="flex justify-between border-b border-[#E8CA58]/20 pb-2">
                             <span className="opacity-70">Movement</span>
                             <span className="font-semibold">Chronograph</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Ref</span>
                             <span className="font-semibold">116508</span>
                         </li>
                     </ul>
                 </div>
              </div>

              {/* Page 3: G-Shock MT-G */}
              <div className="h-screen flex items-center justify-start pl-[10vw] pointer-events-none">
                 <div className="text-[#D0D5DB] max-w-sm bg-black/40 p-8 border border-[#D0D5DB]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(208,213,219,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">G-Shock MT-G</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#D0D5DB]/20 pb-2">
                             <span className="opacity-70">Case</span>
                             <span className="font-semibold">Steel / Resin</span>
                         </li>
                         <li className="flex justify-between border-b border-[#D0D5DB]/20 pb-2">
                             <span className="opacity-70">Structure</span>
                             <span className="font-semibold">Core Guard</span>
                         </li>
                         <li className="flex justify-between border-b border-[#D0D5DB]/20 pb-2">
                             <span className="opacity-70">Tech</span>
                             <span className="font-semibold">Solar / BT</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Glass</span>
                             <span className="font-semibold">Sapphire</span>
                         </li>
                     </ul>
                 </div>
              </div>

              {/* Page 4: Seiko Chronograph */}
              <div className="h-screen flex items-center justify-end pr-[10vw] pointer-events-none">
                 <div className="text-[#E0E5E9] max-w-sm bg-black/40 p-8 border border-[#E0E5E9]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(224,229,233,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">Seiko Chrono</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#E0E5E9]/20 pb-2">
                             <span className="opacity-70">Case</span>
                             <span className="font-semibold">Steel 45mm</span>
                         </li>
                         <li className="flex justify-between border-b border-[#E0E5E9]/20 pb-2">
                             <span className="opacity-70">Dial</span>
                             <span className="font-semibold text-[#8AB4F8]">Sunray Blue</span>
                         </li>
                         <li className="flex justify-between border-b border-[#E0E5E9]/20 pb-2">
                             <span className="opacity-70">Glass</span>
                             <span className="font-semibold">Mineral</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Water Res</span>
                             <span className="font-semibold">100m</span>
                         </li>
                     </ul>
                 </div>
              </div>

              {/* Page 5: Movado Circa */}
              <div className="h-screen flex items-center justify-start pl-[10vw] pointer-events-none">
                 <div className="text-[#D4AF37] max-w-sm bg-black/40 p-8 border border-[#D4AF37]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">Movado Circa</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                             <span className="opacity-70">Case</span>
                             <span className="font-semibold">Gold 42mm</span>
                         </li>
                         <li className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                             <span className="opacity-70">Dial</span>
                             <span className="font-semibold text-white">Sunray Blue</span>
                         </li>
                         <li className="flex justify-between border-b border-[#D4AF37]/20 pb-2">
                             <span className="opacity-70">Strap</span>
                             <span className="font-semibold">Leather</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Movement</span>
                             <span className="font-semibold">Swiss Quartz</span>
                         </li>
                     </ul>
                 </div>
              </div>

              {/* Page 6: OLEVS Automatic */}
              <div className="h-screen flex items-center justify-end pr-[10vw] pointer-events-none">
                 <div className="text-[#F0F0F0] max-w-sm bg-black/40 p-8 border border-[#F0F0F0]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(240,240,240,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">OLEVS Auto</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#F0F0F0]/20 pb-2">
                             <span className="opacity-70">Case</span>
                             <span className="font-semibold text-gray-400">Black PVD 41mm</span>
                         </li>
                         <li className="flex justify-between border-b border-[#F0F0F0]/20 pb-2">
                             <span className="opacity-70">Feature</span>
                             <span className="font-semibold">Tourbillon</span>
                         </li>
                         <li className="flex justify-between border-b border-[#F0F0F0]/20 pb-2">
                             <span className="opacity-70">Complication</span>
                             <span className="font-semibold">Sun/Moon Phase</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Movement</span>
                             <span className="font-semibold">Automatic</span>
                         </li>
                     </ul>
                 </div>
              </div>

            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
      <ScrollIndicator />
    </section>
  );
};

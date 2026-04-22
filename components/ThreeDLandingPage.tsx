import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Float } from '@react-three/drei';
import { RolexModel } from './watches/RolexModel';
import { GForceModel } from './watches/GForceModel';
import { OmegaModel } from './watches/OmegaModel';
import { ScrollIndicator } from './ScrollIndicator';

interface ThreeDLandingPageProps {
  onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

const WatchScene = () => {
  // With a camera fov of 50 and z-position of 8, the viewport height is roughly 7.46 units
  const viewportHeight = 7.46;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Rolex Section (Page 2) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, -viewportHeight, 0]}>
        <RolexModel scale={0.8} />
      </Float>

      {/* GForce Section (Page 3) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, -viewportHeight * 2, 0]}>
        <GForceModel scale={0.8} />
      </Float>

      {/* Omega Section (Page 4) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, -viewportHeight * 3, 0]}>
        <OmegaModel scale={0.8} />
      </Float>
    </>
  );
};

export const ThreeDLandingPage: React.FC<ThreeDLandingPageProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full h-screen bg-void overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ScrollControls pages={4} damping={0.2}>
            <Scroll>
              <WatchScene />
            </Scroll>

            <Scroll html style={{ width: '100%', height: '100%' }}>
              {/* Hero Page */}
              <div className="h-screen flex items-center justify-start pl-[10vw] pointer-events-none">
                 <div className="text-white max-w-md pointer-events-auto">
                     <h1 className="text-6xl font-bold tracking-tighter mb-4">AURELION</h1>
                     <p className="text-xl text-white/60 mb-8">Scroll to explore our masterful collection of procedural timepieces.</p>
                     <button onClick={() => onNavigate('gallery')} className="px-6 py-3 border border-white/20 hover:border-white/60 transition-colors uppercase tracking-widest text-sm backdrop-blur-md">
                        View Full Gallery
                     </button>
                 </div>
              </div>

              {/* Rolex Specs */}
              <div className="h-screen flex items-center justify-end pr-[10vw] pointer-events-none">
                 <div className="text-[#00ffcc] max-w-sm bg-black/40 p-8 border border-[#00ffcc]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(0,255,204,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">Oyster Perpetual</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#00ffcc]/20 pb-2">
                             <span className="opacity-70">Case Size</span>
                             <span className="font-semibold">41mm</span>
                         </li>
                         <li className="flex justify-between border-b border-[#00ffcc]/20 pb-2">
                             <span className="opacity-70">Material</span>
                             <span className="font-semibold">Oystersteel</span>
                         </li>
                         <li className="flex justify-between border-b border-[#00ffcc]/20 pb-2">
                             <span className="opacity-70">Movement</span>
                             <span className="font-semibold">Calibre 3230</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Water Res</span>
                             <span className="font-semibold">100m</span>
                         </li>
                     </ul>
                 </div>
              </div>

              {/* GForce Specs */}
              <div className="h-screen flex items-center justify-start pl-[10vw] pointer-events-none">
                 <div className="text-[#ff00ff] max-w-sm bg-black/40 p-8 border border-[#ff00ff]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">G-Force Master</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#ff00ff]/20 pb-2">
                             <span className="opacity-70">Case Size</span>
                             <span className="font-semibold">50mm</span>
                         </li>
                         <li className="flex justify-between border-b border-[#ff00ff]/20 pb-2">
                             <span className="opacity-70">Material</span>
                             <span className="font-semibold">Carbon Resin</span>
                         </li>
                         <li className="flex justify-between border-b border-[#ff00ff]/20 pb-2">
                             <span className="opacity-70">Movement</span>
                             <span className="font-semibold">Solar Quartz</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Water Res</span>
                             <span className="font-semibold">200m</span>
                         </li>
                     </ul>
                 </div>
              </div>

              {/* Omega Specs */}
              <div className="h-screen flex items-center justify-end pr-[10vw] pointer-events-none">
                 <div className="text-[#00aaff] max-w-sm bg-black/40 p-8 border border-[#00aaff]/30 backdrop-blur-md rounded-lg pointer-events-auto shadow-[0_0_15px_rgba(0,170,255,0.2)]">
                     <h2 className="text-4xl font-bold mb-6 tracking-wider uppercase">Seamaster</h2>
                     <ul className="space-y-4 text-sm tracking-widest uppercase">
                         <li className="flex justify-between border-b border-[#00aaff]/20 pb-2">
                             <span className="opacity-70">Case Size</span>
                             <span className="font-semibold">42mm</span>
                         </li>
                         <li className="flex justify-between border-b border-[#00aaff]/20 pb-2">
                             <span className="opacity-70">Material</span>
                             <span className="font-semibold">Ceramic / Ti</span>
                         </li>
                         <li className="flex justify-between border-b border-[#00aaff]/20 pb-2">
                             <span className="opacity-70">Movement</span>
                             <span className="font-semibold">Co-Axial 8800</span>
                         </li>
                         <li className="flex justify-between pb-2">
                             <span className="opacity-70">Water Res</span>
                             <span className="font-semibold">300m</span>
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

import React, { useEffect, useRef, useState } from 'react';

// Utility for linear interpolation
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

// Helper to determine opacity based on a phase window with fade-in/out
const getPhaseOpacity = (
  progress: number,
  startFadeIn: number,
  endFadeIn: number,
  startFadeOut: number,
  endFadeOut: number
) => {
  if (progress < startFadeIn || progress > endFadeOut) return 0;
  if (progress >= endFadeIn && progress <= startFadeOut) return 1;
  if (progress >= startFadeIn && progress < endFadeIn) {
    return (progress - startFadeIn) / (endFadeIn - startFadeIn);
  }
  if (progress > startFadeOut && progress <= endFadeOut) {
    return 1 - (progress - startFadeOut) / (endFadeOut - startFadeOut);
  }
  return 0;
};

interface VideoScrollLandingPageProps {
  onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

export const VideoScrollLandingPage: React.FC<VideoScrollLandingPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // We'll use refs to avoid re-renders during the fast requestAnimationFrame loop
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const requestRef = useRef<number>();
  
  // UI Overlays Ref
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const techOverlayRef = useRef<HTMLDivElement>(null);
  const explosionOverlayRef = useRef<HTMLDivElement>(null);
  const internalOverlayRef = useRef<HTMLDivElement>(null);
  const microDetailOverlayRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  // Video loaded state
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Calculate how far we've scrolled through the container
      // Window height minus the total scrollable height
      const maxScroll = rect.height - window.innerHeight;
      const currentScroll = -rect.top; // Because rect.top is negative as we scroll down
      
      // Clamp progress between 0 and 1
      let rawProgress = currentScroll / maxScroll;
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      targetProgressRef.current = rawProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateFrame = () => {
    // Lerp progress for smooth playback
    progressRef.current = lerp(progressRef.current, targetProgressRef.current, 0.08);
    const p = progressRef.current;

    // Update Video Time
    if (videoRef.current && videoLoaded && videoRef.current.duration) {
      // Avoid seeking exactly to the end to prevent video ending glitches in some browsers
      const targetTime = p * videoRef.current.duration;
      // Only set if we are far enough to matter to avoid micro-jitters
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.01) {
        videoRef.current.currentTime = targetTime;
      }
    }

    // Update DOM overlays directly
    // 0.00 – 0.12: Intro
    if (introOverlayRef.current) {
      introOverlayRef.current.style.opacity = getPhaseOpacity(p, 0, 0.02, 0.10, 0.14).toString();
    }
    // 0.12 – 0.25: Tech
    if (techOverlayRef.current) {
      techOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.10, 0.14, 0.23, 0.27).toString();
    }
    // 0.25 – 0.48: Explosion
    if (explosionOverlayRef.current) {
      explosionOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.23, 0.27, 0.46, 0.50).toString();
    }
    // 0.48 – 0.65: Internal
    if (internalOverlayRef.current) {
      internalOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.46, 0.50, 0.63, 0.67).toString();
    }
    // 0.65 – 0.80: Micro Detail
    if (microDetailOverlayRef.current) {
      microDetailOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.63, 0.67, 0.78, 0.82).toString();
    }
    // 0.90 – 1.00: Hero (Reassembly happens 0.80 - 0.92, overlays fade out)
    if (heroOverlayRef.current) {
      heroOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.90, 0.94, 1.0, 1.0).toString();
    }

    requestRef.current = requestAnimationFrame(updateFrame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateFrame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [videoLoaded]);

  const handleVideoLoadedMetadata = () => {
    setVideoLoaded(true);
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '600vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Video Scrubber Element */}
        <video
          ref={videoRef}
          src="/watch-animation.mp4"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleVideoLoadedMetadata}
        />

        {/* Global Blueprint Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(30, 41, 59, 0) 0%, rgba(15, 23, 42, 0.8) 100%)' }}></div>
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* --- OVERLAYS --- */}

        {/* 1. Intro Overlay */}
        <div ref={introOverlayRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-100 ease-out z-10">
          <h1 className="text-6xl md:text-8xl font-light tracking-widest text-white drop-shadow-lg uppercase mb-4">Aurelion</h1>
          <p className="text-xl md:text-2xl text-blue-300 font-mono tracking-widest">AEROSPACE GRADE PRECISION</p>
          <div className="absolute bottom-12 flex flex-col items-center animate-pulse">
            <span className="text-sm font-mono text-gray-400 mb-2 uppercase">Scroll to Deconstruct</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
          </div>
        </div>

        {/* 2. Tech Transition Overlay */}
        <div ref={techOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
          <div className="absolute top-12 left-12 flex flex-col space-y-2">
            <span className="text-xs font-mono text-blue-400 border border-blue-400/30 px-2 py-1 bg-blue-900/20">ELEV: ORTHO_01</span>
            <span className="text-xs font-mono text-gray-400 border border-gray-600/30 px-2 py-1 bg-gray-900/20">STATE: ENGAGED</span>
          </div>
          <div className="absolute bottom-12 right-12 flex flex-col text-right space-y-1">
            <span className="text-xs font-mono text-white/50">PLAN VIEW CALIBRATION</span>
            <span className="text-[10px] font-mono text-blue-400/70">[ AXIS X-Y-Z SYNCHRONIZED ]</span>
          </div>
        </div>

        {/* 3. Structural Explosion Overlay */}
        <div ref={explosionOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
          {/* Bezel Label */}
          <div className="absolute top-[20%] right-[15%] md:right-[25%] flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-mono text-white tracking-widest">BEZEL</p>
              <p className="text-[10px] font-mono text-blue-400">CERAMIC COMPOSITE</p>
            </div>
            <div className="w-16 md:w-32 h-[1px] bg-blue-500/50 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Sapphire Crystal Label */}
          <div className="absolute top-[35%] left-[15%] md:left-[25%] flex items-center gap-4">
             <div className="w-16 md:w-32 h-[1px] bg-blue-500/50 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
            </div>
            <div className="text-left">
              <p className="text-sm font-mono text-white tracking-widest">CRYSTAL</p>
              <p className="text-[10px] font-mono text-blue-400">ANTI-REFLECTIVE SAPPHIRE</p>
            </div>
          </div>
        </div>

        {/* 4. Internal Exposure Overlay */}
        <div ref={internalOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
           {/* Movement Label */}
           <div className="absolute top-[50%] right-[10%] md:right-[20%] flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-mono text-white tracking-widest bg-blue-900/40 px-2 py-1 border border-blue-500/30">CALIBER 900X</p>
              <p className="text-[10px] font-mono text-gray-300 mt-1">28,800 VPH / 4HZ</p>
            </div>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-blue-500/80 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-blue-400 rounded-full bg-blue-900/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
          </div>

          {/* Battery/Power Label */}
           <div className="absolute top-[65%] left-[10%] md:left-[20%] flex items-center gap-4">
            <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-blue-500/80 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border border-blue-400 rounded-full bg-blue-900/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
            <div className="text-left">
              <p className="text-sm font-mono text-white tracking-widest bg-blue-900/40 px-2 py-1 border border-blue-500/30">POWER RESERVE</p>
              <p className="text-[10px] font-mono text-gray-300 mt-1">72 HOURS CAPACITY</p>
            </div>
          </div>
        </div>

        {/* 5. Micro Detail Pass Overlay */}
        <div ref={microDetailOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
          {/* Crown */}
          <div className="absolute top-[45%] right-[25%] flex flex-col items-center">
             <div className="h-16 w-[1px] bg-white/50 mb-2"></div>
             <p className="text-xs font-mono text-white tracking-widest">SCREW-DOWN CROWN</p>
             <p className="text-[10px] font-mono text-blue-400">TRIPLE SEAL SYSTEM</p>
          </div>
          {/* Case back */}
          <div className="absolute bottom-[20%] left-[30%] flex flex-col items-center">
             <p className="text-xs font-mono text-white tracking-widest">TITANIUM GRADE 5</p>
             <p className="text-[10px] font-mono text-blue-400 mb-2">MICRO-BLASTED FINISH</p>
             <div className="h-16 w-[1px] bg-white/50"></div>
          </div>
        </div>

        {/* 6. Final Hero Overlay */}
        <div ref={heroOverlayRef} className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none opacity-0 z-10">
          <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl flex flex-col items-center pointer-events-auto">
            <h2 className="text-3xl font-light tracking-widest text-white uppercase mb-2">Master the Time</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-sm text-center">The Aurelion sequence is complete. Precision engineering realized.</p>
            <button 
              onClick={() => onNavigate('gallery')}
              className="px-8 py-3 bg-white text-black text-sm font-medium tracking-widest uppercase hover:bg-gray-200 transition-colors"
            >
              Discover Collection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

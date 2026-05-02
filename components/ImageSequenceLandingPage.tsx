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

interface ImageSequenceLandingPageProps {
  onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

const FRAME_COUNT = 90;
// We assume images are placed in /public/sequence/frame_0001.webp etc.
const getFrameUrl = (index: number) => {
  const paddedIndex = (index + 1).toString().padStart(4, '0');
  return `/sequence/frame_${paddedIndex}.webp`;
};

export const ImageSequenceLandingPage: React.FC<ImageSequenceLandingPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State and Refs for Animation Loop
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const requestRef = useRef<number>();
  
  // Image Caching
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const imagesLoadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

  // UI Overlays Ref
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const techOverlayRef = useRef<HTMLDivElement>(null);
  const explosionOverlayRef = useRef<HTMLDivElement>(null);
  const internalOverlayRef = useRef<HTMLDivElement>(null);
  const microDetailOverlayRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  // Preload Images
  useEffect(() => {
    let loaded = 0;
    
    // We preload sequentially to prioritize early frames, but we could also chunk it
    const preloadFrame = (index: number) => {
      if (index >= FRAME_COUNT) return;
      
      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        imagesRef.current[index] = img;
        imagesLoadedRef.current[index] = true;
        loaded++;
        setImagesLoadedCount(loaded);
        // Load next frame
        preloadFrame(index + 1);
      };
      img.onerror = () => {
        // If image fails, we still mark it as "loaded" (but null) to continue the chain
        // We will use fallback canvas drawing if image is missing
        imagesLoadedRef.current[index] = true;
        loaded++;
        setImagesLoadedCount(loaded);
        preloadFrame(index + 1);
      };
    };

    // Kick off preloader
    preloadFrame(0);
  }, []);

  // Handle Resize
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        // Set actual canvas size to match display size for high DPI
        const dpr = window.devicePixelRatio || 1;
        const rect = canvasRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          canvasRef.current.width = rect.width * dpr;
          canvasRef.current.height = rect.height * dpr;
        }
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      const maxScroll = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      
      let rawProgress = currentScroll / maxScroll;
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      targetProgressRef.current = rawProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fallback drawing for missing images (a rotating blueprint wireframe)
  const drawFallbackWireframe = (ctx: CanvasRenderingContext2D, width: number, height: number, frameFraction: number) => {
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)'; // Blueprint blue
    ctx.lineWidth = 2;
    
    const cx = width / 2;
    const cy = height / 2;
    const size = Math.min(width, height) * 0.25;
    
    // Rotate based on frame fraction
    const angle = frameFraction * Math.PI * 2;
    
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    
    // Draw outer rings
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2);
    ctx.setLineDash([5, 15]);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw crosshairs
    ctx.beginPath();
    ctx.moveTo(-size * 1.2, 0);
    ctx.lineTo(size * 1.2, 0);
    ctx.moveTo(0, -size * 1.2);
    ctx.lineTo(0, size * 1.2);
    ctx.stroke();

    // Draw some structural lines
    ctx.beginPath();
    ctx.moveTo(-size * 0.5, -size * 0.5);
    ctx.lineTo(size * 0.5, size * 0.5);
    ctx.moveTo(size * 0.5, -size * 0.5);
    ctx.lineTo(-size * 0.5, size * 0.5);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.stroke();
    
    ctx.restore();
    
    // Draw generic fallback text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`FRAME SEQUENCE MISSING (${Math.round(frameFraction * FRAME_COUNT)}/${FRAME_COUNT})`, cx, cy + size * 1.5);
    ctx.fillText(`Please add .webp files to /public/sequence/`, cx, cy + size * 1.5 + 30);
  };

  const updateFrame = () => {
    // Increase lerp factor from 0.08 to 0.18 for snappier, less laggy scroll response
    progressRef.current = lerp(progressRef.current, targetProgressRef.current, 0.18);
    const p = progressRef.current;

    // --- CANVAS RENDERING WITH IN-BETWEEN FLUIDITY ---
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const exactFrame = p * (FRAME_COUNT - 1);
        const frame1Index = Math.floor(exactFrame);
        const frame2Index = Math.min(Math.ceil(exactFrame), FRAME_COUNT - 1);
        const blendFactor = exactFrame - frame1Index;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const img1 = imagesRef.current[frame1Index];
        const img2 = imagesRef.current[frame2Index];
        
        // Draw Frame 1
        if (img1) {
          ctx.globalAlpha = 1;
          // Scale to cover
          const scale = Math.max(canvas.width / img1.width, canvas.height / img1.height);
          const drawW = Math.round(img1.width * scale);
          const drawH = Math.round(img1.height * scale);
          const x = Math.round((canvas.width / 2) - (drawW / 2));
          const y = Math.round((canvas.height / 2) - (drawH / 2));
          ctx.drawImage(img1, x, y, drawW, drawH);
        } else {
           // Fallback
           ctx.globalAlpha = 1;
           drawFallbackWireframe(ctx, canvas.width, canvas.height, frame1Index / FRAME_COUNT);
        }

        // Draw Frame 2 overlayed for fluid crossfade (in-between generation)
        if (frame1Index !== frame2Index && blendFactor > 0.01) {
          if (img2) {
            ctx.globalAlpha = blendFactor;
            const scale = Math.max(canvas.width / img2.width, canvas.height / img2.height);
            const drawW = Math.round(img2.width * scale);
            const drawH = Math.round(img2.height * scale);
            const x = Math.round((canvas.width / 2) - (drawW / 2));
            const y = Math.round((canvas.height / 2) - (drawH / 2));
            ctx.drawImage(img2, x, y, drawW, drawH);
          } else {
            // Fallback blending
            ctx.globalAlpha = blendFactor;
            drawFallbackWireframe(ctx, canvas.width, canvas.height, frame2Index / FRAME_COUNT);
          }
        }
        
        ctx.globalAlpha = 1; // Reset alpha
      }
    }

    // --- DOM OVERLAYS UPDATE ---
    // Frame mapping: Total = 90
    // 0-10: Initial (0.00 - 0.11)
    if (introOverlayRef.current) {
      introOverlayRef.current.style.opacity = getPhaseOpacity(p, 0, 0.02, 0.08, 0.11).toString();
    }
    // 10-22: Tech (0.11 - 0.24)
    if (techOverlayRef.current) {
      techOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.11, 0.13, 0.22, 0.24).toString();
    }
    // 22-45: Explosion (0.24 - 0.50)
    if (explosionOverlayRef.current) {
      explosionOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.24, 0.27, 0.47, 0.50).toString();
    }
    // 45-60: Internal (0.50 - 0.67)
    if (internalOverlayRef.current) {
      internalOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.50, 0.53, 0.64, 0.67).toString();
    }
    // 60-75: Micro (0.67 - 0.83)
    if (microDetailOverlayRef.current) {
      microDetailOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.67, 0.70, 0.80, 0.83).toString();
    }
    // 75-90: Hero (0.83 - 1.00)
    if (heroOverlayRef.current) {
      heroOverlayRef.current.style.opacity = getPhaseOpacity(p, 0.88, 0.92, 1.0, 1.0).toString();
    }

    requestRef.current = requestAnimationFrame(updateFrame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateFrame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    // Reduced container height from 800vh to 500vh to make scrubbing through frames faster
    <div ref={containerRef} className="relative w-full bg-void" style={{ height: '500vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {/* Canvas Renderer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-screen"
        />

        {/* Dark Blue Hue Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-blue-950/70 mix-blend-multiply"></div>

        {/* Global Blueprint Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(30, 41, 59, 0) 0%, rgba(15, 23, 42, 0.8) 100%)' }}></div>
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        {/* Loading Indicator */}
        {imagesLoadedCount < FRAME_COUNT && (
          <div className="absolute top-4 right-4 z-50 text-[10px] font-mono text-blue-400 border border-blue-500/30 bg-blue-900/40 px-2 py-1 rounded">
            SEQ_BUFFER: {imagesLoadedCount}/{FRAME_COUNT}
          </div>
        )}

        {/* --- OVERLAYS --- */}

        {/* 1. Intro Overlay (Frames 0-10) */}
        <div ref={introOverlayRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-100 ease-out z-10">
          <h1 className="text-6xl md:text-8xl font-light tracking-widest text-white drop-shadow-lg uppercase mb-4">Aurelion</h1>
          <p className="text-sm md:text-lg text-blue-300 font-mono tracking-widest uppercase">Hyper-engineered mechanical timepieces</p>
          <div className="absolute bottom-12 flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12 pointer-events-auto">
            <div className="flex flex-col items-center animate-pulse pointer-events-none">
              <span className="text-xs font-mono text-gray-400 mb-2 uppercase">Scroll to Deconstruct</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
            
            <button 
              onClick={() => onNavigate('gallery')}
              className="md:mb-4 px-6 py-2 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 text-xs font-mono uppercase tracking-widest transition-all backdrop-blur-sm"
            >
              View Collection
            </button>
          </div>
        </div>

        {/* 2. Tech Transition Overlay (Frames 10-22) */}
        <div ref={techOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
          <div className="absolute top-1/4 left-[10%] flex flex-col space-y-3 max-w-sm">
            <span className="text-xs font-mono text-blue-400 border border-blue-400/30 px-3 py-1.5 bg-blue-900/20 backdrop-blur-sm w-max tracking-widest">THE AURELION DIRECTIVE</span>
            <p className="text-sm md:text-base font-serif text-white/90 leading-relaxed bg-black/40 p-5 border-l-2 border-blue-500/50 backdrop-blur-md">
              Forged in extremes. We source aerospace-grade titanium not for prestige, but because true endurance demands nothing less than the absolute limit of material science.
            </p>
          </div>
        </div>

        {/* 3. Structural Explosion Overlay (Frames 22-45) */}
        <div ref={explosionOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
          <div className="absolute top-[35%] right-[10%] md:right-[15%] flex flex-col space-y-3 max-w-sm text-right items-end">
            <span className="text-xs font-mono text-blue-400 border border-blue-400/30 px-3 py-1.5 bg-blue-900/20 backdrop-blur-sm w-max tracking-widest">UNCOMPROMISING CRAFT</span>
            <p className="text-sm md:text-base font-serif text-white/90 leading-relaxed bg-black/40 p-5 border-r-2 border-blue-500/50 backdrop-blur-md">
              A singular obsession with perfection. Every curve, facet, and sapphire crystal is milled to tolerances invisible to the human eye. Precision is not a metric; it is our religion.
            </p>
          </div>
        </div>

        {/* 4. Internal Exposure Overlay (Frames 45-60) */}
        <div ref={internalOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
           <div className="absolute top-[45%] left-[10%] md:left-[15%] flex flex-col space-y-3 max-w-sm">
            <span className="text-xs font-mono text-blue-400 border border-blue-400/30 px-3 py-1.5 bg-blue-900/20 backdrop-blur-sm w-max tracking-widest">THE BEATING HEART</span>
            <p className="text-sm md:text-base font-serif text-white/90 leading-relaxed bg-black/40 p-5 border-l-2 border-blue-500/50 backdrop-blur-md">
              28,800 vibrations per hour. Hand-assembled over weeks by master horologists. It is not just an engine—it is a mechanical soul, breathing life into cold titanium.
            </p>
          </div>
        </div>

        {/* 5. Micro Detail Pass Overlay (Frames 60-75) */}
        <div ref={microDetailOverlayRef} className="absolute inset-0 pointer-events-none opacity-0 z-10">
          <div className="absolute bottom-[20%] right-[10%] md:right-[20%] flex flex-col space-y-3 max-w-sm text-right items-end">
            <span className="text-xs font-mono text-blue-400 border border-blue-400/30 px-3 py-1.5 bg-blue-900/20 backdrop-blur-sm w-max tracking-widest">DEFYING MASS PRODUCTION</span>
            <p className="text-sm md:text-base font-serif text-white/90 leading-relaxed bg-black/40 p-5 border-r-2 border-blue-500/50 backdrop-blur-md">
              Each Aurelion timepiece requires 400 hours of uncompromising labor. In a world of instant gratification, we believe true luxury cannot be rushed. Allocations are strictly limited.
            </p>
          </div>
        </div>

        {/* 6. Final Hero Overlay (Frames 75-90) */}
        <div ref={heroOverlayRef} className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none opacity-0 z-10">
          <div className="bg-black/60 backdrop-blur-xl border border-white/20 p-8 rounded-2xl flex flex-col items-center pointer-events-auto shadow-2xl">
            <h2 className="text-3xl font-light tracking-widest text-white uppercase mb-2">Master the Time</h2>
            <p className="text-sm text-gray-300 mb-8 max-w-sm text-center">The sequence is complete. You have seen the obsession. Now, experience the reality.</p>
            <button 
              onClick={() => onNavigate('gallery')}
              className="px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-blue-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
            >
              Discover Collection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { IMAGES } from '../constants';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    onNavigate: (view: 'home' | 'gallery' | 'craft' | 'contact') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    return (
        <section className="relative flex-grow flex flex-col items-center justify-center min-h-[100vh] w-full bg-void-gradient overflow-hidden pt-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none"></div>

            {/* Watch Container */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square flex items-center justify-center"
            >
                <img 
                    src={IMAGES.heroWatch} 
                    alt="Luxury silver chronograph watch with dramatic lighting" 
                    className="w-full h-full object-contain drop-shadow-2xl opacity-90 hover:scale-[1.02] transition-transform duration-1000 ease-out select-none"
                    draggable={false}
                />
                
                {/* Hotspot */}
                <div className="absolute top-[45%] left-[60%] group cursor-pointer z-20">
                    <span className="relative flex h-3 w-3">
                      <motion.span 
                        animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                      />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-[0_0_15px_rgba(242,185,13,0.8)]"></span>
                    </span>
                    
                    {/* Tooltip */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-40 pointer-events-none translate-x-2 group-hover:translate-x-0 ease-out">
                        <p className="text-[10px] uppercase tracking-widest text-primary border-l border-primary pl-3 py-1 font-medium bg-void/50 backdrop-blur-sm">
                            Sapphire Crystal
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Hero Content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-20 text-center flex flex-col items-center gap-8 -mt-16 md:-mt-24"
            >
                <h2 className="text-glow text-gray-200 text-sm md:text-base font-light tracking-[0.4em] uppercase opacity-80">
                    Precision, Refined.
                </h2>

                <button 
                    onClick={() => onNavigate('gallery')} 
                    className="group relative inline-flex items-center justify-center px-12 py-3 overflow-hidden font-medium text-primary transition duration-300 ease-out border border-white/10 rounded-full shadow-lg hover:border-primary/50"
                >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-void duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                        <ArrowRight className="w-4 h-4" />
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease text-[10px] md:text-xs uppercase tracking-widest font-bold">
                        Enter Boutique
                    </span>
                    <span className="relative invisible text-xs uppercase tracking-widest">Enter Boutique</span>
                </button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5, y: [0, 10, 0] }}
                transition={{ 
                    opacity: { delay: 1.5, duration: 1 },
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
            >
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
            </motion.div>
        </section>
    );
};